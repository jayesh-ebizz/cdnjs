import { Object } from 'ts-toolbelt';
import Koa from 'koa';
import { Store as ReduxStore } from 'redux';
import * as ActionCreators from './core/action-creators';
import { Flow } from './core/flow';
import { CreateGameReducer } from './core/reducer';
import { INVALID_MOVE } from './core/constants';
import * as StorageAPI from './server/db/base';
import { EventsAPI } from './plugins/plugin-events';
import { RandomAPI } from './plugins/plugin-random';
export { StorageAPI };
export { BoardProps } from './client/react';
export declare type AnyFn = (...args: any[]) => any;
export interface State<G extends any = any, CtxWithPlugins extends Ctx = Ctx> {
    G: G;
    ctx: Ctx | CtxWithPlugins;
    deltalog?: Array<LogEntry>;
    plugins: {
        [pluginName: string]: PluginState;
    };
    _undo: Array<Undo<G>>;
    _redo: Array<Undo<G>>;
    _stateID: number;
}
export declare type PartialGameState = Pick<State, 'G' | 'ctx' | 'plugins'>;
export declare type StageName = string;
export declare type PlayerID = string;
export declare type StageArg = StageName | {
    stage?: StageName;
    moveLimit?: number;
};
export interface ActivePlayersArg {
    currentPlayer?: StageArg;
    others?: StageArg;
    all?: StageArg;
    value?: Record<PlayerID, StageArg>;
    moveLimit?: number;
    revert?: boolean;
    next?: ActivePlayersArg;
}
export interface ActivePlayers {
    [playerID: string]: StageName;
}
export interface Ctx {
    numPlayers: number;
    playOrder: Array<PlayerID>;
    playOrderPos: number;
    playerID?: PlayerID;
    activePlayers: null | ActivePlayers;
    currentPlayer: PlayerID;
    numMoves?: number;
    gameover?: any;
    turn: number;
    phase: string;
    _activePlayersMoveLimit?: Record<PlayerID, number>;
    _activePlayersNumMoves?: Record<PlayerID, number>;
    _prevActivePlayers?: Array<{
        activePlayers: null | ActivePlayers;
        _activePlayersMoveLimit?: Record<PlayerID, number>;
        _activePlayersNumMoves?: Record<PlayerID, number>;
    }>;
    _nextActivePlayers?: ActivePlayersArg;
    _random?: {
        seed: string | number;
    };
    events?: EventsAPI;
    random?: RandomAPI;
}
export interface PluginState {
    data: any;
    api?: any;
}
export interface LogEntry {
    action: ActionShape.MakeMove | ActionShape.GameEvent;
    _stateID: number;
    turn: number;
    phase: string;
    redact?: boolean;
    automatic?: boolean;
}
interface PluginContext<API extends any = any, Data extends any = any, G extends any = any> {
    G: G;
    ctx: Ctx;
    game: Game;
    api: API;
    data: Data;
}
export interface Plugin<API extends any = any, Data extends any = any, G extends any = any> {
    name: string;
    noClient?: (context: PluginContext<API, Data, G>) => boolean;
    setup?: (setupCtx: {
        G: G;
        ctx: Ctx;
        game: Game<G, Ctx>;
    }) => Data;
    action?: (data: Data, payload: ActionShape.Plugin['payload']) => Data;
    api?: (context: {
        G: G;
        ctx: Ctx;
        game: Game<G, Ctx>;
        data: Data;
        playerID?: PlayerID;
    }) => API;
    flush?: (context: PluginContext<API, Data, G>) => Data;
    dangerouslyFlushRawState?: (flushCtx: {
        state: State<G, Ctx>;
        game: Game<G, Ctx>;
        api: API;
        data: Data;
    }) => State<G, Ctx>;
    fnWrap?: (fn: AnyFn) => (G: G, ctx: Ctx, ...args: any[]) => any;
}
declare type MoveFn<G extends any = any, CtxWithPlugins extends Ctx = Ctx> = (G: G, ctx: CtxWithPlugins, ...args: any[]) => any;
export interface LongFormMove<G extends any = any, CtxWithPlugins extends Ctx = Ctx> {
    move: MoveFn<G, CtxWithPlugins>;
    redact?: boolean;
    noLimit?: boolean;
    client?: boolean;
    undoable?: boolean | ((G: G, ctx: CtxWithPlugins) => boolean);
}
export declare type Move<G extends any = any, CtxWithPlugins extends Ctx = Ctx> = MoveFn<G, CtxWithPlugins> | LongFormMove<G, CtxWithPlugins>;
export interface MoveMap<G extends any = any, CtxWithPlugins extends Ctx = Ctx> {
    [moveName: string]: Move<G, CtxWithPlugins>;
}
export interface PhaseConfig<G extends any = any, CtxWithPlugins extends Ctx = Ctx> {
    start?: boolean;
    next?: string;
    onBegin?: (G: G, ctx: CtxWithPlugins) => any;
    onEnd?: (G: G, ctx: CtxWithPlugins) => any;
    endIf?: (G: G, ctx: CtxWithPlugins) => boolean | void | {
        next: string;
    };
    moves?: MoveMap<G, CtxWithPlugins>;
    turn?: TurnConfig<G, CtxWithPlugins>;
    wrapped?: {
        endIf?: (state: State<G, CtxWithPlugins>) => boolean | void | {
            next: string;
        };
        onBegin?: (state: State<G, CtxWithPlugins>) => any;
        onEnd?: (state: State<G, CtxWithPlugins>) => any;
    };
}
export interface StageConfig<G extends any = any, CtxWithPlugins extends Ctx = Ctx> {
    moves?: MoveMap<G, CtxWithPlugins>;
    next?: string;
}
export interface StageMap<G extends any = any, CtxWithPlugins extends Ctx = Ctx> {
    [stageName: string]: StageConfig<G, CtxWithPlugins>;
}
export interface TurnOrderConfig<G extends any = any, CtxWithPlugins extends Ctx = Ctx> {
    first: (G: G, ctx: CtxWithPlugins) => number;
    next: (G: G, ctx: CtxWithPlugins) => number | undefined;
    playOrder?: (G: G, ctx: CtxWithPlugins) => PlayerID[];
}
export interface TurnConfig<G extends any = any, CtxWithPlugins extends Ctx = Ctx> {
    activePlayers?: object;
    moveLimit?: number;
    onBegin?: (G: G, ctx: CtxWithPlugins) => any;
    onEnd?: (G: G, ctx: CtxWithPlugins) => any;
    endIf?: (G: G, ctx: CtxWithPlugins) => boolean | void | {
        next: PlayerID;
    };
    onMove?: (G: G, ctx: CtxWithPlugins) => any;
    stages?: StageMap<G, CtxWithPlugins>;
    moves?: MoveMap<G, CtxWithPlugins>;
    order?: TurnOrderConfig<G, CtxWithPlugins>;
    wrapped?: {
        endIf?: (state: State<G, CtxWithPlugins>) => boolean | void | {
            next: PlayerID;
        };
        onBegin?: (state: State<G, CtxWithPlugins>) => any;
        onEnd?: (state: State<G, CtxWithPlugins>) => any;
        onMove?: (state: State<G, CtxWithPlugins>) => any;
    };
}
interface PhaseMap<G extends any = any, CtxWithPlugins extends Ctx = Ctx> {
    [phaseName: string]: PhaseConfig<G, CtxWithPlugins>;
}
export interface Game<G extends any = any, CtxWithPlugins extends Ctx = Ctx> {
    name?: string;
    disableUndo?: boolean;
    seed?: string | number;
    setup?: (ctx: CtxWithPlugins, setupData?: any) => any;
    moves?: MoveMap<G, CtxWithPlugins>;
    phases?: PhaseMap<G, CtxWithPlugins>;
    turn?: TurnConfig<G, CtxWithPlugins>;
    events?: {
        endGame?: boolean;
        endPhase?: boolean;
        endTurn?: boolean;
        setPhase?: boolean;
        endStage?: boolean;
        setStage?: boolean;
        pass?: boolean;
        setActivePlayers?: boolean;
    };
    endIf?: (G: G, ctx: CtxWithPlugins) => any;
    onEnd?: (G: G, ctx: CtxWithPlugins) => any;
    playerView?: (G: G, ctx: CtxWithPlugins, playerID: PlayerID) => any;
    plugins?: Array<Plugin<any, any, G>>;
    ai?: {
        enumerate: (G: G, ctx: Ctx, playerID: PlayerID) => Array<{
            event: string;
            args?: any[];
        } | {
            move: string;
            args?: any[];
        } | ActionShape.MakeMove | ActionShape.GameEvent>;
    };
    processMove?: (state: State<G, Ctx | CtxWithPlugins>, action: ActionPayload.MakeMove) => State<G, CtxWithPlugins> | typeof INVALID_MOVE;
    flow?: ReturnType<typeof Flow>;
}
declare type Undo<G extends any = any> = {
    G: G;
    ctx: Ctx;
    moveType?: string;
};
export declare namespace Server {
    type GenerateCredentials = (ctx: Koa.DefaultContext) => Promise<string> | string;
    type AuthenticateCredentials = (credentials: string, playerMetadata: PlayerMetadata) => Promise<boolean> | boolean;
    type PlayerMetadata = {
        id: number;
        name?: string;
        credentials?: string;
        data?: any;
    };
    interface GameMetadata {
        gameName: string;
        players: {
            [id: number]: PlayerMetadata;
        };
        setupData?: any;
        gameover?: any;
        nextRoomID?: string;
        unlisted?: boolean;
    }
    interface LobbyConfig {
        uuid?: () => string;
        generateCredentials?: GenerateCredentials;
        apiPort?: number;
        apiCallback?: () => void;
    }
}
export declare type Reducer = ReturnType<typeof CreateGameReducer>;
export declare type Store = ReduxStore<State, ActionShape.Any>;
export declare namespace CredentialedActionShape {
    type MakeMove = ReturnType<typeof ActionCreators.makeMove>;
    type GameEvent = ReturnType<typeof ActionCreators.gameEvent>;
    type Plugin = ReturnType<typeof ActionCreators.plugin>;
    type AutomaticGameEvent = ReturnType<typeof ActionCreators.automaticGameEvent>;
    type Undo = ReturnType<typeof ActionCreators.undo>;
    type Redo = ReturnType<typeof ActionCreators.redo>;
    type Any = MakeMove | GameEvent | AutomaticGameEvent | Undo | Redo | Plugin;
}
export declare namespace ActionShape {
    type StripCredentials<T extends object> = Object.P.Omit<T, ['payload', 'credentials']>;
    export type MakeMove = StripCredentials<CredentialedActionShape.MakeMove>;
    export type GameEvent = StripCredentials<CredentialedActionShape.GameEvent>;
    export type Plugin = StripCredentials<CredentialedActionShape.Plugin>;
    export type AutomaticGameEvent = StripCredentials<CredentialedActionShape.AutomaticGameEvent>;
    export type Sync = ReturnType<typeof ActionCreators.sync>;
    export type Update = ReturnType<typeof ActionCreators.update>;
    export type Reset = ReturnType<typeof ActionCreators.reset>;
    export type Undo = StripCredentials<CredentialedActionShape.Undo>;
    export type Redo = StripCredentials<CredentialedActionShape.Redo>;
    export type Any = MakeMove | GameEvent | AutomaticGameEvent | Sync | Update | Reset | Undo | Redo | Plugin;
    export {};
}
export declare namespace ActionPayload {
    type GetPayload<T extends object> = Object.At<T, 'payload'>;
    export type MakeMove = GetPayload<ActionShape.MakeMove>;
    export type GameEvent = GetPayload<ActionShape.GameEvent>;
    export {};
}
export declare type FilteredMetadata = {
    id: number;
    name?: string;
}[];
export interface SyncInfo {
    state: State;
    filteredMetadata: FilteredMetadata;
    initialState: State;
    log: LogEntry[];
}
