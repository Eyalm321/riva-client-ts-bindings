/// <reference types="node" />
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { type CallOptions, ChannelCredentials, Client, type ClientOptions, ClientReadableStream, type ClientUnaryCall, handleServerStreamingCall, type handleUnaryCall, Metadata, type ServiceError, type UntypedServiceImplementation } from "@grpc/grpc-js";
import { AudioEncoding } from "./riva_audio";
import { RequestId } from "./riva_common";
export declare const protobufPackage = "nvidia.riva.tts";
export interface RivaSynthesisConfigRequest {
    /**
     * If model is specified only return config for model, otherwise return all
     * configs.
     */
    modelName: string;
}
export interface RivaSynthesisConfigResponse {
    modelConfig: RivaSynthesisConfigResponse_Config[];
}
export interface RivaSynthesisConfigResponse_Config {
    modelName: string;
    parameters: {
        [key: string]: string;
    };
}
export interface RivaSynthesisConfigResponse_Config_ParametersEntry {
    key: string;
    value: string;
}
/** Required for Zero Shot model */
export interface ZeroShotData {
    /** Audio prompt for Zero Shot model. Duration should be between 3 to 10 seconds. */
    audioPrompt: Uint8Array;
    /** Sample rate for input audio prompt. */
    sampleRateHz: number;
    /** Encoding of audio prompt. Supported encodings are LINEAR_PCM and OGGOPUS. */
    encoding: AudioEncoding;
    /**
     * The number of times user wants to pass audio through decoder. This ranges
     * between 1-40. Defaults to 20.
     */
    quality: number;
}
export interface SynthesizeSpeechRequest {
    text: string;
    languageCode: string;
    /** audio encoding params */
    encoding: AudioEncoding;
    sampleRateHz: number;
    /** voice params */
    voiceName: string;
    /** Zero Shot model params */
    zeroShotData: ZeroShotData | undefined;
    /**
     * A string containing comma-separated key-value pairs of
     * grapheme and corresponding phoneme separated by double spaces.
     */
    customDictionary: string;
    /**
     * The ID to be associated with the request. If provided, this will be
     * returned in the corresponding response.
     */
    id: RequestId | undefined;
}
export interface SynthesizeSpeechResponseMetadata {
    /**
     * Currently experimental API addition that returns the input text
     * after preprocessing has been completed as well as the predicted
     * duration for each token.
     * Note: this message is subject to future breaking changes, and potential
     * removal.
     */
    text: string;
    processedText: string;
    predictedDurations: number[];
}
export interface SynthesizeSpeechResponse {
    audio: Uint8Array;
    meta: SynthesizeSpeechResponseMetadata | undefined;
    /** The ID associated with the request */
    id: RequestId | undefined;
}
export declare const RivaSynthesisConfigRequest: {
    encode(message: RivaSynthesisConfigRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RivaSynthesisConfigRequest;
    fromJSON(object: any): RivaSynthesisConfigRequest;
    toJSON(message: RivaSynthesisConfigRequest): unknown;
    create<I extends {
        modelName?: string | undefined;
    } & {
        modelName?: string | undefined;
    } & { [K in Exclude<keyof I, "modelName">]: never; }>(base?: I): RivaSynthesisConfigRequest;
    fromPartial<I_1 extends {
        modelName?: string | undefined;
    } & {
        modelName?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "modelName">]: never; }>(object: I_1): RivaSynthesisConfigRequest;
};
export declare const RivaSynthesisConfigResponse: {
    encode(message: RivaSynthesisConfigResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RivaSynthesisConfigResponse;
    fromJSON(object: any): RivaSynthesisConfigResponse;
    toJSON(message: RivaSynthesisConfigResponse): unknown;
    create<I extends {
        modelConfig?: {
            modelName?: string | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        modelConfig?: ({
            modelName?: string | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
        }[] & ({
            modelName?: string | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            modelName?: string | undefined;
            parameters?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K in Exclude<keyof I["modelConfig"][number]["parameters"], string | number>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["modelConfig"][number], keyof RivaSynthesisConfigResponse_Config>]: never; })[] & { [K_2 in Exclude<keyof I["modelConfig"], keyof {
            modelName?: string | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "modelConfig">]: never; }>(base?: I): RivaSynthesisConfigResponse;
    fromPartial<I_1 extends {
        modelConfig?: {
            modelName?: string | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
        }[] | undefined;
    } & {
        modelConfig?: ({
            modelName?: string | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
        }[] & ({
            modelName?: string | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
        } & {
            modelName?: string | undefined;
            parameters?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_4 in Exclude<keyof I_1["modelConfig"][number]["parameters"], string | number>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I_1["modelConfig"][number], keyof RivaSynthesisConfigResponse_Config>]: never; })[] & { [K_6 in Exclude<keyof I_1["modelConfig"], keyof {
            modelName?: string | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, "modelConfig">]: never; }>(object: I_1): RivaSynthesisConfigResponse;
};
export declare const RivaSynthesisConfigResponse_Config: {
    encode(message: RivaSynthesisConfigResponse_Config, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RivaSynthesisConfigResponse_Config;
    fromJSON(object: any): RivaSynthesisConfigResponse_Config;
    toJSON(message: RivaSynthesisConfigResponse_Config): unknown;
    create<I extends {
        modelName?: string | undefined;
        parameters?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        modelName?: string | undefined;
        parameters?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K in Exclude<keyof I["parameters"], string | number>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof RivaSynthesisConfigResponse_Config>]: never; }>(base?: I): RivaSynthesisConfigResponse_Config;
    fromPartial<I_1 extends {
        modelName?: string | undefined;
        parameters?: {
            [x: string]: string | undefined;
        } | undefined;
    } & {
        modelName?: string | undefined;
        parameters?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["parameters"], string | number>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof RivaSynthesisConfigResponse_Config>]: never; }>(object: I_1): RivaSynthesisConfigResponse_Config;
};
export declare const RivaSynthesisConfigResponse_Config_ParametersEntry: {
    encode(message: RivaSynthesisConfigResponse_Config_ParametersEntry, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RivaSynthesisConfigResponse_Config_ParametersEntry;
    fromJSON(object: any): RivaSynthesisConfigResponse_Config_ParametersEntry;
    toJSON(message: RivaSynthesisConfigResponse_Config_ParametersEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof RivaSynthesisConfigResponse_Config_ParametersEntry>]: never; }>(base?: I): RivaSynthesisConfigResponse_Config_ParametersEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof RivaSynthesisConfigResponse_Config_ParametersEntry>]: never; }>(object: I_1): RivaSynthesisConfigResponse_Config_ParametersEntry;
};
export declare const ZeroShotData: {
    encode(message: ZeroShotData, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ZeroShotData;
    fromJSON(object: any): ZeroShotData;
    toJSON(message: ZeroShotData): unknown;
    create<I extends {
        audioPrompt?: Uint8Array | undefined;
        sampleRateHz?: number | undefined;
        encoding?: AudioEncoding | undefined;
        quality?: number | undefined;
    } & {
        audioPrompt?: Uint8Array | undefined;
        sampleRateHz?: number | undefined;
        encoding?: AudioEncoding | undefined;
        quality?: number | undefined;
    } & { [K in Exclude<keyof I, keyof ZeroShotData>]: never; }>(base?: I): ZeroShotData;
    fromPartial<I_1 extends {
        audioPrompt?: Uint8Array | undefined;
        sampleRateHz?: number | undefined;
        encoding?: AudioEncoding | undefined;
        quality?: number | undefined;
    } & {
        audioPrompt?: Uint8Array | undefined;
        sampleRateHz?: number | undefined;
        encoding?: AudioEncoding | undefined;
        quality?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof ZeroShotData>]: never; }>(object: I_1): ZeroShotData;
};
export declare const SynthesizeSpeechRequest: {
    encode(message: SynthesizeSpeechRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SynthesizeSpeechRequest;
    fromJSON(object: any): SynthesizeSpeechRequest;
    toJSON(message: SynthesizeSpeechRequest): unknown;
    create<I extends {
        text?: string | undefined;
        languageCode?: string | undefined;
        encoding?: AudioEncoding | undefined;
        sampleRateHz?: number | undefined;
        voiceName?: string | undefined;
        zeroShotData?: {
            audioPrompt?: Uint8Array | undefined;
            sampleRateHz?: number | undefined;
            encoding?: AudioEncoding | undefined;
            quality?: number | undefined;
        } | undefined;
        customDictionary?: string | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        text?: string | undefined;
        languageCode?: string | undefined;
        encoding?: AudioEncoding | undefined;
        sampleRateHz?: number | undefined;
        voiceName?: string | undefined;
        zeroShotData?: ({
            audioPrompt?: Uint8Array | undefined;
            sampleRateHz?: number | undefined;
            encoding?: AudioEncoding | undefined;
            quality?: number | undefined;
        } & {
            audioPrompt?: Uint8Array | undefined;
            sampleRateHz?: number | undefined;
            encoding?: AudioEncoding | undefined;
            quality?: number | undefined;
        } & { [K in Exclude<keyof I["zeroShotData"], keyof ZeroShotData>]: never; }) | undefined;
        customDictionary?: string | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_1 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof SynthesizeSpeechRequest>]: never; }>(base?: I): SynthesizeSpeechRequest;
    fromPartial<I_1 extends {
        text?: string | undefined;
        languageCode?: string | undefined;
        encoding?: AudioEncoding | undefined;
        sampleRateHz?: number | undefined;
        voiceName?: string | undefined;
        zeroShotData?: {
            audioPrompt?: Uint8Array | undefined;
            sampleRateHz?: number | undefined;
            encoding?: AudioEncoding | undefined;
            quality?: number | undefined;
        } | undefined;
        customDictionary?: string | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        text?: string | undefined;
        languageCode?: string | undefined;
        encoding?: AudioEncoding | undefined;
        sampleRateHz?: number | undefined;
        voiceName?: string | undefined;
        zeroShotData?: ({
            audioPrompt?: Uint8Array | undefined;
            sampleRateHz?: number | undefined;
            encoding?: AudioEncoding | undefined;
            quality?: number | undefined;
        } & {
            audioPrompt?: Uint8Array | undefined;
            sampleRateHz?: number | undefined;
            encoding?: AudioEncoding | undefined;
            quality?: number | undefined;
        } & { [K_3 in Exclude<keyof I_1["zeroShotData"], keyof ZeroShotData>]: never; }) | undefined;
        customDictionary?: string | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_4 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof SynthesizeSpeechRequest>]: never; }>(object: I_1): SynthesizeSpeechRequest;
};
export declare const SynthesizeSpeechResponseMetadata: {
    encode(message: SynthesizeSpeechResponseMetadata, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SynthesizeSpeechResponseMetadata;
    fromJSON(object: any): SynthesizeSpeechResponseMetadata;
    toJSON(message: SynthesizeSpeechResponseMetadata): unknown;
    create<I extends {
        text?: string | undefined;
        processedText?: string | undefined;
        predictedDurations?: number[] | undefined;
    } & {
        text?: string | undefined;
        processedText?: string | undefined;
        predictedDurations?: (number[] & number[] & { [K in Exclude<keyof I["predictedDurations"], keyof number[]>]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof SynthesizeSpeechResponseMetadata>]: never; }>(base?: I): SynthesizeSpeechResponseMetadata;
    fromPartial<I_1 extends {
        text?: string | undefined;
        processedText?: string | undefined;
        predictedDurations?: number[] | undefined;
    } & {
        text?: string | undefined;
        processedText?: string | undefined;
        predictedDurations?: (number[] & number[] & { [K_2 in Exclude<keyof I_1["predictedDurations"], keyof number[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof SynthesizeSpeechResponseMetadata>]: never; }>(object: I_1): SynthesizeSpeechResponseMetadata;
};
export declare const SynthesizeSpeechResponse: {
    encode(message: SynthesizeSpeechResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SynthesizeSpeechResponse;
    fromJSON(object: any): SynthesizeSpeechResponse;
    toJSON(message: SynthesizeSpeechResponse): unknown;
    create<I extends {
        audio?: Uint8Array | undefined;
        meta?: {
            text?: string | undefined;
            processedText?: string | undefined;
            predictedDurations?: number[] | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        audio?: Uint8Array | undefined;
        meta?: ({
            text?: string | undefined;
            processedText?: string | undefined;
            predictedDurations?: number[] | undefined;
        } & {
            text?: string | undefined;
            processedText?: string | undefined;
            predictedDurations?: (number[] & number[] & { [K in Exclude<keyof I["meta"]["predictedDurations"], keyof number[]>]: never; }) | undefined;
        } & { [K_1 in Exclude<keyof I["meta"], keyof SynthesizeSpeechResponseMetadata>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_2 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof SynthesizeSpeechResponse>]: never; }>(base?: I): SynthesizeSpeechResponse;
    fromPartial<I_1 extends {
        audio?: Uint8Array | undefined;
        meta?: {
            text?: string | undefined;
            processedText?: string | undefined;
            predictedDurations?: number[] | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        audio?: Uint8Array | undefined;
        meta?: ({
            text?: string | undefined;
            processedText?: string | undefined;
            predictedDurations?: number[] | undefined;
        } & {
            text?: string | undefined;
            processedText?: string | undefined;
            predictedDurations?: (number[] & number[] & { [K_4 in Exclude<keyof I_1["meta"]["predictedDurations"], keyof number[]>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I_1["meta"], keyof SynthesizeSpeechResponseMetadata>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_6 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof SynthesizeSpeechResponse>]: never; }>(object: I_1): SynthesizeSpeechResponse;
};
export type RivaSpeechSynthesisService = typeof RivaSpeechSynthesisService;
export declare const RivaSpeechSynthesisService: {
    /**
     * Used to request text-to-speech from the service. Submit a request
     * containing the desired text and configuration, and receive audio bytes in
     * the requested format.
     */
    readonly synthesize: {
        readonly path: "/nvidia.riva.tts.RivaSpeechSynthesis/Synthesize";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: SynthesizeSpeechRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => SynthesizeSpeechRequest;
        readonly responseSerialize: (value: SynthesizeSpeechResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => SynthesizeSpeechResponse;
    };
    /**
     * Used to request text-to-speech returned via stream as it becomes available.
     * Submit a SynthesizeSpeechRequest with desired text and configuration,
     * and receive stream of bytes in the requested format.
     */
    readonly synthesizeOnline: {
        readonly path: "/nvidia.riva.tts.RivaSpeechSynthesis/SynthesizeOnline";
        readonly requestStream: false;
        readonly responseStream: true;
        readonly requestSerialize: (value: SynthesizeSpeechRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => SynthesizeSpeechRequest;
        readonly responseSerialize: (value: SynthesizeSpeechResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => SynthesizeSpeechResponse;
    };
    /**
     * Enables clients to request the configuration of the current Synthesize
     * service, or a specific model within the service.
     */
    readonly getRivaSynthesisConfig: {
        readonly path: "/nvidia.riva.tts.RivaSpeechSynthesis/GetRivaSynthesisConfig";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: RivaSynthesisConfigRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => RivaSynthesisConfigRequest;
        readonly responseSerialize: (value: RivaSynthesisConfigResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => RivaSynthesisConfigResponse;
    };
};
export interface RivaSpeechSynthesisServer extends UntypedServiceImplementation {
    /**
     * Used to request text-to-speech from the service. Submit a request
     * containing the desired text and configuration, and receive audio bytes in
     * the requested format.
     */
    synthesize: handleUnaryCall<SynthesizeSpeechRequest, SynthesizeSpeechResponse>;
    /**
     * Used to request text-to-speech returned via stream as it becomes available.
     * Submit a SynthesizeSpeechRequest with desired text and configuration,
     * and receive stream of bytes in the requested format.
     */
    synthesizeOnline: handleServerStreamingCall<SynthesizeSpeechRequest, SynthesizeSpeechResponse>;
    /**
     * Enables clients to request the configuration of the current Synthesize
     * service, or a specific model within the service.
     */
    getRivaSynthesisConfig: handleUnaryCall<RivaSynthesisConfigRequest, RivaSynthesisConfigResponse>;
}
export interface RivaSpeechSynthesisClient extends Client {
    /**
     * Used to request text-to-speech from the service. Submit a request
     * containing the desired text and configuration, and receive audio bytes in
     * the requested format.
     */
    synthesize(request: SynthesizeSpeechRequest, callback: (error: ServiceError | null, response: SynthesizeSpeechResponse) => void): ClientUnaryCall;
    synthesize(request: SynthesizeSpeechRequest, metadata: Metadata, callback: (error: ServiceError | null, response: SynthesizeSpeechResponse) => void): ClientUnaryCall;
    synthesize(request: SynthesizeSpeechRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: SynthesizeSpeechResponse) => void): ClientUnaryCall;
    /**
     * Used to request text-to-speech returned via stream as it becomes available.
     * Submit a SynthesizeSpeechRequest with desired text and configuration,
     * and receive stream of bytes in the requested format.
     */
    synthesizeOnline(request: SynthesizeSpeechRequest, options?: Partial<CallOptions>): ClientReadableStream<SynthesizeSpeechResponse>;
    synthesizeOnline(request: SynthesizeSpeechRequest, metadata?: Metadata, options?: Partial<CallOptions>): ClientReadableStream<SynthesizeSpeechResponse>;
    /**
     * Enables clients to request the configuration of the current Synthesize
     * service, or a specific model within the service.
     */
    getRivaSynthesisConfig(request: RivaSynthesisConfigRequest, callback: (error: ServiceError | null, response: RivaSynthesisConfigResponse) => void): ClientUnaryCall;
    getRivaSynthesisConfig(request: RivaSynthesisConfigRequest, metadata: Metadata, callback: (error: ServiceError | null, response: RivaSynthesisConfigResponse) => void): ClientUnaryCall;
    getRivaSynthesisConfig(request: RivaSynthesisConfigRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: RivaSynthesisConfigResponse) => void): ClientUnaryCall;
}
export declare const RivaSpeechSynthesisClient: {
    new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): RivaSpeechSynthesisClient;
    service: typeof RivaSpeechSynthesisService;
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
