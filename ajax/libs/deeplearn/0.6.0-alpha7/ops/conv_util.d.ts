export declare type PadInfo = {
    top: number;
    left: number;
    right: number;
    bottom: number;
};
export declare type Conv2DInfo = {
    batchSize: number;
    inHeight: number;
    inWidth: number;
    inChannels: number;
    outHeight: number;
    outWidth: number;
    outChannels: number;
    dataFormat: 'channelsFirst' | 'channelsLast';
    strideHeight: number;
    strideWidth: number;
    dilationHeight: number;
    dilationWidth: number;
    filterHeight: number;
    filterWidth: number;
    padInfo: PadInfo;
    inShape: [number, number, number, number];
    outShape: [number, number, number, number];
    filterShape: [number, number, number, number];
};
export declare function computePool2DInfo(inShape: [number, number, number, number], filterSize: [number, number] | number, strides: number | [number, number], pad: 'same' | 'valid' | number, roundingMode?: 'floor' | 'round' | 'ceil', dataFormat?: 'channelsFirst' | 'channelsLast'): Conv2DInfo;
export declare function computeConv2DInfo(inShape: [number, number, number, number], filterShape: [number, number, number, number], strides: number | [number, number], dilations: number | [number, number], pad: 'same' | 'valid' | number, roundingMode?: 'floor' | 'round' | 'ceil', depthwise?: boolean, dataFormat?: 'channelsFirst' | 'channelsLast'): Conv2DInfo;
export declare function computeDefaultPad(inputShape: [number, number, number], fieldSize: number, stride: number, dilation?: number): number;
