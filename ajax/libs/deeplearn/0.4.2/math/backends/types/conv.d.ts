import { NamedArrayMap } from '../../../util';
import { Conv2DInfo } from '../../conv_util';
import { Array1D, Array4D } from '../../ndarray';
import { KernelInputConfig, KernelNode, TapeNodeInputGradientArrays } from '../tape_types';
export interface Conv2DNode extends KernelNode {
    inputAndArgs: Conv2DInputConfig;
    output: Array4D;
    gradient: (dy: Array4D, y: Array4D) => Conv2DGradientInputArrays;
}
export interface Conv2DInputConfig extends KernelInputConfig {
    inputs: Conv2DInputArrays;
    args: {
        convInfo: Conv2DInfo;
    };
}
export interface Conv2DInputArrays extends NamedArrayMap {
    x: Array4D;
    filter: Array4D;
    bias?: Array1D;
}
export interface Conv2DGradientInputArrays extends TapeNodeInputGradientArrays {
    x: () => Array4D;
    filter: () => Array4D;
    bias?: () => Array1D;
}
export interface Conv2DDerInputNode extends KernelNode {
    inputAndArgs: Conv2DDerInputInputConfig;
    output: Array4D;
    gradient: (dy: Array4D, y: Array4D) => Conv2DDerInputGradientInputArrays;
}
export interface Conv2DDerInputInputConfig extends KernelInputConfig {
    inputs: Conv2DDerInputInputArrays;
    args: {
        convInfo: Conv2DInfo;
    };
}
export interface Conv2DDerInputInputArrays extends NamedArrayMap {
    dy: Array4D;
    filter: Array4D;
}
export interface Conv2DDerInputGradientInputArrays extends TapeNodeInputGradientArrays {
    dy: () => Array4D;
    filter: () => Array4D;
}
export interface Conv2DDerFilterNode extends KernelNode {
    inputAndArgs: Conv2DDerFilterInputConfig;
    output: Array4D;
    gradient: (dy: Array4D, y: Array4D) => Conv2DDerFilterGradientInputArrays;
}
export interface Conv2DDerFilterInputConfig extends KernelInputConfig {
    inputs: Conv2DDerFilterInputArrays;
    args: {
        convInfo: Conv2DInfo;
    };
}
export interface Conv2DDerFilterInputArrays extends NamedArrayMap {
    x: Array4D;
    dy: Array4D;
}
export interface Conv2DDerFilterGradientInputArrays extends TapeNodeInputGradientArrays {
    x: () => Array4D;
    dy: () => Array4D;
}
export interface Conv2DDerBiasNode extends KernelNode {
    inputAndArgs: Conv2DDerBiasInputConfig;
    output: Array1D;
    gradient: (dy: Array1D, y: Array1D) => Conv2DDerBiasGradientInputArrays;
}
export interface Conv2DDerBiasInputConfig extends KernelInputConfig {
    inputs: Conv2DDerBiasInputArrays;
}
export interface Conv2DDerBiasInputArrays extends NamedArrayMap {
    dy: Array4D;
}
export interface Conv2DDerBiasGradientInputArrays extends TapeNodeInputGradientArrays {
    dy: () => Array4D;
}
export interface DepthwiseConv2DNode extends KernelNode {
    inputAndArgs: DepthwiseConv2DInputConfig;
    output: Array4D;
    gradient: (dy: Array4D, y: Array4D) => DepthwiseConv2DGradientInputArrays;
}
export interface DepthwiseConv2DInputConfig extends KernelInputConfig {
    inputs: DepthwiseConv2DInputArrays;
    args: {
        convInfo: Conv2DInfo;
    };
}
export interface DepthwiseConv2DInputArrays extends NamedArrayMap {
    x: Array4D;
    filter: Array4D;
}
export interface DepthwiseConv2DGradientInputArrays extends TapeNodeInputGradientArrays {
    x: () => Array4D;
    filter: () => Array4D;
}
