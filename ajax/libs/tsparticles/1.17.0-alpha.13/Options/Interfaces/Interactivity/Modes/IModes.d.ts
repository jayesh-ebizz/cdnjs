import type { IBubble } from "./IBubble";
import type { IConnect } from "./IConnect";
import type { IGrab } from "./IGrab";
import type { IPush } from "./IPush";
import type { IRemove } from "./IRemove";
import type { IRepulse } from "./IRepulse";
import type { ISlow } from "./ISlow";
import type { ITrail } from "./ITrail";
export interface IModes {
    bubble: IBubble;
    connect: IConnect;
    grab: IGrab;
    push: IPush;
    remove: IRemove;
    repulse: IRepulse;
    slow: ISlow;
    trail: ITrail;
}
