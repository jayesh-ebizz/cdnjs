'use strict';

var Debug = require('./Debug-0ac3084e.js');
var redux = require('redux');
var turnOrder = require('./turn-order-d6c2e620.js');
var reducer = require('./reducer-76d3a4df.js');
var initialize = require('./initialize-18a8be06.js');

/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */
/**
 * createDispatchers
 *
 * Create action dispatcher wrappers with bound playerID and credentials
 */
function createDispatchers(storeActionType, innerActionNames, store, playerID, credentials, multiplayer) {
    return innerActionNames.reduce((dispatchers, name) => {
        dispatchers[name] = function (...args) {
            let assumedPlayerID = playerID;
            // In singleplayer mode, if the client does not have a playerID
            // associated with it, we attach the currentPlayer as playerID.
            if (!multiplayer && (playerID === null || playerID === undefined)) {
                const state = store.getState();
                assumedPlayerID = state.ctx.currentPlayer;
            }
            store.dispatch(turnOrder.ActionCreators[storeActionType](name, args, assumedPlayerID, credentials));
        };
        return dispatchers;
    }, {});
}
// Creates a set of dispatchers to make moves.
const createMoveDispatchers = createDispatchers.bind(null, 'makeMove');
// Creates a set of dispatchers to dispatch game flow events.
const createEventDispatchers = createDispatchers.bind(null, 'gameEvent');
// Creates a set of dispatchers to dispatch actions to plugins.
const createPluginDispatchers = createDispatchers.bind(null, 'plugin');
/**
 * Implementation of Client (see below).
 */
class _ClientImpl {
    constructor({ game, debug, numPlayers, multiplayer, gameID, playerID, credentials, enhancer, }) {
        this.game = reducer.ProcessGameConfig(game);
        this.playerID = playerID;
        this.gameID = gameID;
        this.credentials = credentials;
        this.multiplayer = multiplayer;
        this.debug = debug;
        this.gameStateOverride = null;
        this.subscribers = {};
        this._running = false;
        this.reducer = reducer.CreateGameReducer({
            game: this.game,
            isClient: multiplayer !== undefined,
        });
        this.initialState = null;
        if (!multiplayer) {
            this.initialState = initialize.InitializeGame({ game: this.game, numPlayers });
        }
        this.reset = () => {
            this.store.dispatch(turnOrder.reset(this.initialState));
        };
        this.undo = () => {
            this.store.dispatch(turnOrder.undo(this.playerID, this.credentials));
        };
        this.redo = () => {
            this.store.dispatch(turnOrder.redo(this.playerID, this.credentials));
        };
        this.store = null;
        this.log = [];
        /**
         * Middleware that manages the log object.
         * Reducers generate deltalogs, which are log events
         * that are the result of application of a single action.
         * The master may also send back a deltalog or the entire
         * log depending on the type of request.
         * The middleware below takes care of all these cases while
         * managing the log object.
         */
        const LogMiddleware = (store) => (next) => (action) => {
            const result = next(action);
            const state = store.getState();
            switch (action.type) {
                case turnOrder.MAKE_MOVE:
                case turnOrder.GAME_EVENT: {
                    const deltalog = state.deltalog;
                    this.log = [...this.log, ...deltalog];
                    break;
                }
                case turnOrder.RESET: {
                    this.log = [];
                    break;
                }
                case turnOrder.UPDATE: {
                    let id = -1;
                    if (this.log.length > 0) {
                        id = this.log[this.log.length - 1]._stateID;
                    }
                    let deltalog = action.deltalog || [];
                    // Filter out actions that are already present
                    // in the current log. This may occur when the
                    // client adds an entry to the log followed by
                    // the update from the master here.
                    deltalog = deltalog.filter(l => l._stateID > id);
                    this.log = [...this.log, ...deltalog];
                    break;
                }
                case turnOrder.SYNC: {
                    this.initialState = action.initialState;
                    this.log = action.log || [];
                    break;
                }
            }
            return result;
        };
        /**
         * Middleware that intercepts actions and sends them to the master,
         * which keeps the authoritative version of the state.
         */
        const TransportMiddleware = (store) => (next) => (action) => {
            const baseState = store.getState();
            const result = next(action);
            if (!('clientOnly' in action)) {
                this.transport.onAction(baseState, action);
            }
            return result;
        };
        /**
         * Middleware that intercepts actions and invokes the subscription callback.
         */
        const SubscriptionMiddleware = () => (next) => (action) => {
            const result = next(action);
            this.notifySubscribers();
            return result;
        };
        if (enhancer !== undefined) {
            enhancer = redux.compose(redux.applyMiddleware(SubscriptionMiddleware, TransportMiddleware, LogMiddleware), enhancer);
        }
        else {
            enhancer = redux.applyMiddleware(SubscriptionMiddleware, TransportMiddleware, LogMiddleware);
        }
        this.store = redux.createStore(this.reducer, this.initialState, enhancer);
        this.transport = {
            isConnected: true,
            onAction: () => { },
            subscribe: () => { },
            subscribeGameMetadata: () => { },
            connect: () => { },
            disconnect: () => { },
            updateGameID: () => { },
            updatePlayerID: () => { },
        };
        if (multiplayer) {
            // typeof multiplayer is 'function'
            this.transport = multiplayer({
                gameKey: game,
                game: this.game,
                store: this.store,
                gameID,
                playerID,
                gameName: this.game.name,
                numPlayers,
            });
        }
        this.createDispatchers();
        this.transport.subscribeGameMetadata(metadata => {
            this.gameMetadata = metadata;
        });
        this._debugPanel = null;
    }
    notifySubscribers() {
        Object.values(this.subscribers).forEach(fn => fn(this.getState()));
    }
    overrideGameState(state) {
        this.gameStateOverride = state;
        this.notifySubscribers();
    }
    start() {
        this.transport.connect();
        this._running = true;
        let debugImpl = null;
        if (process.env.NODE_ENV !== 'production') {
            debugImpl = Debug.Debug;
        }
        if (this.debug && this.debug !== true && this.debug.impl) {
            debugImpl = this.debug.impl;
        }
        if (debugImpl !== null &&
            this.debug !== false &&
            this._debugPanel == null &&
            typeof document !== 'undefined') {
            let target = document.body;
            if (this.debug &&
                this.debug !== true &&
                this.debug.target !== undefined) {
                target = this.debug.target;
            }
            if (target) {
                this._debugPanel = new debugImpl({
                    target,
                    props: {
                        client: this,
                    },
                });
            }
        }
    }
    stop() {
        this.transport.disconnect();
        this._running = false;
        if (this._debugPanel != null) {
            this._debugPanel.$destroy();
            this._debugPanel = null;
        }
    }
    subscribe(fn) {
        const id = Object.keys(this.subscribers).length;
        this.subscribers[id] = fn;
        this.transport.subscribe(() => this.notifySubscribers());
        if (this._running || !this.multiplayer) {
            fn(this.getState());
        }
        // Return a handle that allows the caller to unsubscribe.
        return () => {
            delete this.subscribers[id];
        };
    }
    getInitialState() {
        return this.initialState;
    }
    getState() {
        let state = this.store.getState();
        if (this.gameStateOverride !== null) {
            state = this.gameStateOverride;
        }
        // This is the state before a sync with the game master.
        if (state === null) {
            return state;
        }
        // isActive.
        let isActive = true;
        const isPlayerActive = this.game.flow.isPlayerActive(state.G, state.ctx, this.playerID);
        if (this.multiplayer && !isPlayerActive) {
            isActive = false;
        }
        if (!this.multiplayer &&
            this.playerID !== null &&
            this.playerID !== undefined &&
            !isPlayerActive) {
            isActive = false;
        }
        if (state.ctx.gameover !== undefined) {
            isActive = false;
        }
        // Secrets are normally stripped on the server,
        // but we also strip them here so that game developers
        // can see their effects while prototyping.
        const G = this.game.playerView(state.G, state.ctx, this.playerID);
        // Combine into return value.
        return {
            ...state,
            G,
            log: this.log,
            isActive,
            isConnected: this.transport.isConnected,
        };
    }
    createDispatchers() {
        this.moves = createMoveDispatchers(this.game.moveNames, this.store, this.playerID, this.credentials, this.multiplayer);
        this.events = createEventDispatchers(this.game.flow.enabledEventNames, this.store, this.playerID, this.credentials, this.multiplayer);
        this.plugins = createPluginDispatchers(this.game.pluginNames, this.store, this.playerID, this.credentials, this.multiplayer);
    }
    updatePlayerID(playerID) {
        this.playerID = playerID;
        this.createDispatchers();
        this.transport.updatePlayerID(playerID);
        this.notifySubscribers();
    }
    updateGameID(gameID) {
        this.gameID = gameID;
        this.createDispatchers();
        this.transport.updateGameID(gameID);
        this.notifySubscribers();
    }
    updateCredentials(credentials) {
        this.credentials = credentials;
        this.createDispatchers();
        this.notifySubscribers();
    }
}
/**
 * Client
 *
 * boardgame.io JS client.
 *
 * @param {...object} game - The return value of `Game`.
 * @param {...object} numPlayers - The number of players.
 * @param {...object} multiplayer - Set to a falsy value or a transportFactory, e.g., SocketIO()
 * @param {...object} gameID - The gameID that you want to connect to.
 * @param {...object} playerID - The playerID associated with this client.
 * @param {...string} credentials - The authentication credentials associated with this client.
 *
 * Returns:
 *   A JS object that provides an API to interact with the
 *   game by dispatching moves and events.
 */
function Client(opts) {
    return new _ClientImpl(opts);
}

exports.Client = Client;
