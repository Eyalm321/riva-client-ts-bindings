/// <reference types="node" />
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { type CallOptions, ChannelCredentials, Client, type ClientOptions, ClientReadableStream, type ClientUnaryCall, handleServerStreamingCall, type handleUnaryCall, Metadata, type ServiceError, type UntypedServiceImplementation } from "@grpc/grpc-js";
export declare const protobufPackage = "grpc.health.v1";
export interface HealthCheckRequest {
    service: string;
}
export interface HealthCheckResponse {
    status: HealthCheckResponse_ServingStatus;
}
export declare enum HealthCheckResponse_ServingStatus {
    UNKNOWN = 0,
    SERVING = 1,
    NOT_SERVING = 2,
    UNRECOGNIZED = -1
}
export declare function healthCheckResponse_ServingStatusFromJSON(object: any): HealthCheckResponse_ServingStatus;
export declare function healthCheckResponse_ServingStatusToJSON(object: HealthCheckResponse_ServingStatus): string;
export declare const HealthCheckRequest: {
    encode(message: HealthCheckRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): HealthCheckRequest;
    fromJSON(object: any): HealthCheckRequest;
    toJSON(message: HealthCheckRequest): unknown;
    create<I extends {
        service?: string | undefined;
    } & {
        service?: string | undefined;
    } & { [K in Exclude<keyof I, "service">]: never; }>(base?: I): HealthCheckRequest;
    fromPartial<I_1 extends {
        service?: string | undefined;
    } & {
        service?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "service">]: never; }>(object: I_1): HealthCheckRequest;
};
export declare const HealthCheckResponse: {
    encode(message: HealthCheckResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): HealthCheckResponse;
    fromJSON(object: any): HealthCheckResponse;
    toJSON(message: HealthCheckResponse): unknown;
    create<I extends {
        status?: HealthCheckResponse_ServingStatus | undefined;
    } & {
        status?: HealthCheckResponse_ServingStatus | undefined;
    } & { [K in Exclude<keyof I, "status">]: never; }>(base?: I): HealthCheckResponse;
    fromPartial<I_1 extends {
        status?: HealthCheckResponse_ServingStatus | undefined;
    } & {
        status?: HealthCheckResponse_ServingStatus | undefined;
    } & { [K_1 in Exclude<keyof I_1, "status">]: never; }>(object: I_1): HealthCheckResponse;
};
export type HealthService = typeof HealthService;
export declare const HealthService: {
    readonly check: {
        readonly path: "/grpc.health.v1.Health/Check";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: HealthCheckRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => HealthCheckRequest;
        readonly responseSerialize: (value: HealthCheckResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => HealthCheckResponse;
    };
    readonly watch: {
        readonly path: "/grpc.health.v1.Health/Watch";
        readonly requestStream: false;
        readonly responseStream: true;
        readonly requestSerialize: (value: HealthCheckRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => HealthCheckRequest;
        readonly responseSerialize: (value: HealthCheckResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => HealthCheckResponse;
    };
};
export interface HealthServer extends UntypedServiceImplementation {
    check: handleUnaryCall<HealthCheckRequest, HealthCheckResponse>;
    watch: handleServerStreamingCall<HealthCheckRequest, HealthCheckResponse>;
}
export interface HealthClient extends Client {
    check(request: HealthCheckRequest, callback: (error: ServiceError | null, response: HealthCheckResponse) => void): ClientUnaryCall;
    check(request: HealthCheckRequest, metadata: Metadata, callback: (error: ServiceError | null, response: HealthCheckResponse) => void): ClientUnaryCall;
    check(request: HealthCheckRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: HealthCheckResponse) => void): ClientUnaryCall;
    watch(request: HealthCheckRequest, options?: Partial<CallOptions>): ClientReadableStream<HealthCheckResponse>;
    watch(request: HealthCheckRequest, metadata?: Metadata, options?: Partial<CallOptions>): ClientReadableStream<HealthCheckResponse>;
}
export declare const HealthClient: {
    new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): HealthClient;
    service: typeof HealthService;
    serviceName: string;
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
