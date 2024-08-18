import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
export declare const protobufPackage = "nvidia.riva";
/** Specifies the request ID of the request. */
export interface RequestId {
    value: string;
}
export declare const RequestId: {
    encode(message: RequestId, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RequestId;
    fromJSON(object: any): RequestId;
    toJSON(message: RequestId): unknown;
    create<I extends {
        value?: string | undefined;
    } & {
        value?: string | undefined;
    } & { [K in Exclude<keyof I, "value">]: never; }>(base?: I): RequestId;
    fromPartial<I_1 extends {
        value?: string | undefined;
    } & {
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "value">]: never; }>(object: I_1): RequestId;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};
