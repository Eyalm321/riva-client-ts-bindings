/// <reference types="node" />
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { type CallOptions, ChannelCredentials, Client, type ClientOptions, type ClientUnaryCall, type handleUnaryCall, Metadata, type ServiceError, type UntypedServiceImplementation } from "@grpc/grpc-js";
import { RequestId } from "./riva_common";
export declare const protobufPackage = "nvidia.riva.nlp";
export interface RivaNLPConfigRequest {
    /**
     * If model is specified only return config for model, otherwise return all
     * configs.
     */
    modelName: string;
}
export interface RivaNLPConfigResponse {
    modelConfig: RivaNLPConfigResponse_Config[];
}
export interface RivaNLPConfigResponse_Config {
    modelName: string;
    parameters: {
        [key: string]: string;
    };
}
export interface RivaNLPConfigResponse_Config_ParametersEntry {
    key: string;
    value: string;
}
/**
 * NLPModelParams is a metadata message that is included in every request
 * message used by the Core NLP Service and is used to specify model
 * characteristics/requirements
 */
export interface NLPModelParams {
    /**
     * Requested model to use. If specified, this takes preference over
     * language_code.
     */
    modelName: string;
    /**
     * Specify language of the supplied text as a
     * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag.
     * Defaults to "en-US" if not set.
     */
    languageCode: string;
}
/**
 * TextTransformRequest is a request type intended for services like
 * TransformText which take an arbitrary text input
 */
export interface TextTransformRequest {
    /**
     * Each repeated text element is handled independently for handling multiple
     * input strings with a single request
     */
    text: string[];
    topN: number;
    model: NLPModelParams | undefined;
    /**
     * The ID to be associated with the request. If provided, this will be
     * returned in the corresponding response.
     */
    id: RequestId | undefined;
}
/**
 * TextTransformResponse is returned by the TransformText method. Responses
 * are returned in the same order as they were requested.
 */
export interface TextTransformResponse {
    text: string[];
    /** The ID associated with the request */
    id: RequestId | undefined;
}
/** TextClassRequest is the input message to the ClassifyText service. */
export interface TextClassRequest {
    /**
     * Each repeated text element is handled independently for handling multiple
     * input strings with a single request
     *
     * @deprecated
     */
    text: string[];
    /**
     * Return the top N classification results for each input. 0 or 1 will return
     * top class, otherwise N. Note: Current disabled.
     *
     * @deprecated
     */
    topN: number;
    /** @deprecated */
    model: NLPModelParams | undefined;
    /**
     * The ID to be associated with the request. If provided, this will be
     * returned in the corresponding response.
     *
     * @deprecated
     */
    id: RequestId | undefined;
}
/** Classification messages return a class name and corresponding score */
export interface Classification {
    /** @deprecated */
    className: string;
    /** @deprecated */
    score: number;
}
/** Span of a particular result */
export interface Span {
    /** @deprecated */
    start: number;
    /** @deprecated */
    end: number;
}
/**
 * ClassificationResults contain zero or more Classification messages
 * If the number of Classifications is > 1, top_n > 1 must have been
 * specified.
 */
export interface ClassificationResult {
    /** @deprecated */
    labels: Classification[];
}
/** TextClassResponse is the return message from the ClassifyText service. */
export interface TextClassResponse {
    /** @deprecated */
    results: ClassificationResult[];
    /**
     * The ID associated with the request
     *
     * @deprecated
     */
    id: RequestId | undefined;
}
/** TokenClassRequest is the input message to the ClassifyText service. */
export interface TokenClassRequest {
    /**
     * Each repeated text element is handled independently for handling multiple
     * input strings with a single request
     *
     * @deprecated
     */
    text: string[];
    /**
     * Return the top N classification results for each input. 0 or 1 will return
     * top class, otherwise N.
     * Note: Current disabled.
     *
     * @deprecated
     */
    topN: number;
    /** @deprecated */
    model: NLPModelParams | undefined;
    /**
     * The ID to be associated with the request. If provided, this will be
     * returned in the corresponding response.
     *
     * @deprecated
     */
    id: RequestId | undefined;
}
/**
 * TokenClassValue is used to correlate an input token with its classification
 * results
 */
export interface TokenClassValue {
    /** @deprecated */
    token: string;
    /** @deprecated */
    label: Classification[];
    /** @deprecated */
    span: Span[];
}
/**
 * TokenClassSequence is used for returning a sequence of TokenClassValue
 * objects in the original order of input tokens
 */
export interface TokenClassSequence {
    /** @deprecated */
    results: TokenClassValue[];
}
/** TokenClassResponse returns a single TokenClassSequence per input request */
export interface TokenClassResponse {
    /** @deprecated */
    results: TokenClassSequence[];
    /**
     * The ID associated with the request
     *
     * @deprecated
     */
    id: RequestId | undefined;
}
/**
 * AnalyzeIntentContext is reserved for future use when we may send context back
 * in a a variety of different formats (including raw neural network hidden
 * states)
 */
export interface AnalyzeIntentContext {
}
/**
 * AnalyzeIntentOptions is an optional configuration message to be sent as part
 * of an AnalyzeIntentRequest with query metadata
 */
export interface AnalyzeIntentOptions {
    /** @deprecated */
    previousIntent?: string | undefined;
    /** @deprecated */
    vectors?: AnalyzeIntentContext | undefined;
    /**
     * Optional domain field. Domain must be supported otherwise an error will be
     * returned. If left blank, a domain detector will be run first and then the
     * query routed to the appropriate intent classifier (if it exists)
     *
     * @deprecated
     */
    domain: string;
    /**
     * Optional language field. Assumed to be "en-US" if not specified.
     *
     * @deprecated
     */
    lang: string;
}
/** AnalyzeIntentRequest is the input message for the AnalyzeIntent service */
export interface AnalyzeIntentRequest {
    /**
     * The string to analyze for intent and slots
     *
     * @deprecated
     */
    query: string;
    /**
     * Optional configuration for the request, including providing context from
     * previous turns and hardcoding a domain/language
     *
     * @deprecated
     */
    options: AnalyzeIntentOptions | undefined;
    /**
     * The ID to be associated with the request. If provided, this will be
     * returned in the corresponding response.
     *
     * @deprecated
     */
    id: RequestId | undefined;
}
/**
 * AnalyzeIntentResponse is returned by the AnalyzeIntent service, and includes
 * information related to the query's intent, (optionally) slot data, and its
 * domain.
 */
export interface AnalyzeIntentResponse {
    /**
     * Intent classification result, including the label and score
     *
     * @deprecated
     */
    intent: Classification | undefined;
    /**
     * List of tokens explicitly marked as filling a slot relevant to the intent,
     * where the tokens may not exactly match the input (based on the recombined
     * values after tokenization)
     *
     * @deprecated
     */
    slots: TokenClassValue[];
    /**
     * Returns the inferred domain for the query if not hardcoded in the request.
     * In the case where the domain was hardcoded in AnalyzeIntentRequest, the
     * returned domain is an exact match to the request. In the case where no
     * domain matches the query, intent and slots will be unset.
     *
     * DEPRECATED, use Classification domain field.
     *
     * @deprecated
     */
    domainStr: string;
    /**
     * Returns the inferred domain for the query if not hardcoded in the request.
     * In the case where the domain was hardcoded in AnalyzeIntentRequest, the
     * returned domain is an exact match to the request. In the case where no
     * domain matches the query, intent and slots will be unset.
     *
     * @deprecated
     */
    domain: Classification | undefined;
    /**
     * The ID associated with the request
     *
     * @deprecated
     */
    id: RequestId | undefined;
}
/**
 * AnalyzeEntitiesOptions is an optional configuration message to be sent as
 * part of an AnalyzeEntitiesRequest with query metadata
 */
export interface AnalyzeEntitiesOptions {
    /**
     * Optional language field. Assumed to be "en-US" if not specified.
     *
     * @deprecated
     */
    lang: string;
}
/** AnalyzeEntitiesRequest is the input message for the AnalyzeEntities service */
export interface AnalyzeEntitiesRequest {
    /**
     * The string to analyze for intent and slots
     *
     * @deprecated
     */
    query: string;
    /**
     * Optional configuration for the request, including providing context from
     * previous turns and hardcoding a domain/language
     *
     * @deprecated
     */
    options: AnalyzeEntitiesOptions | undefined;
    /**
     * The ID to be associated with the request. If provided, this will be
     * returned in the corresponding response.
     *
     * @deprecated
     */
    id: RequestId | undefined;
}
export interface NaturalQueryRequest {
    /**
     * The natural language query
     *
     * @deprecated
     */
    query: string;
    /**
     * Maximum number of answers to return for the query. Defaults to 1 if not
     * set.
     *
     * @deprecated
     */
    topN: number;
    /**
     * Context to search with the above query
     *
     * @deprecated
     */
    context: string;
    /**
     * The ID to be associated with the request. If provided, this will be
     * returned in the corresponding response.
     *
     * @deprecated
     */
    id: RequestId | undefined;
}
export interface NaturalQueryResult {
    /**
     * text which answers the query
     *
     * @deprecated
     */
    answer: string;
    /**
     * Score representing confidence in result
     *
     * @deprecated
     */
    score: number;
}
export interface NaturalQueryResponse {
    /** @deprecated */
    results: NaturalQueryResult[];
    /**
     * The ID associated with the request
     *
     * @deprecated
     */
    id: RequestId | undefined;
}
export declare const RivaNLPConfigRequest: {
    encode(message: RivaNLPConfigRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RivaNLPConfigRequest;
    fromJSON(object: any): RivaNLPConfigRequest;
    toJSON(message: RivaNLPConfigRequest): unknown;
    create<I extends {
        modelName?: string | undefined;
    } & {
        modelName?: string | undefined;
    } & { [K in Exclude<keyof I, "modelName">]: never; }>(base?: I): RivaNLPConfigRequest;
    fromPartial<I_1 extends {
        modelName?: string | undefined;
    } & {
        modelName?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "modelName">]: never; }>(object: I_1): RivaNLPConfigRequest;
};
export declare const RivaNLPConfigResponse: {
    encode(message: RivaNLPConfigResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RivaNLPConfigResponse;
    fromJSON(object: any): RivaNLPConfigResponse;
    toJSON(message: RivaNLPConfigResponse): unknown;
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
        } & { [K_1 in Exclude<keyof I["modelConfig"][number], keyof RivaNLPConfigResponse_Config>]: never; })[] & { [K_2 in Exclude<keyof I["modelConfig"], keyof {
            modelName?: string | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "modelConfig">]: never; }>(base?: I): RivaNLPConfigResponse;
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
        } & { [K_5 in Exclude<keyof I_1["modelConfig"][number], keyof RivaNLPConfigResponse_Config>]: never; })[] & { [K_6 in Exclude<keyof I_1["modelConfig"], keyof {
            modelName?: string | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, "modelConfig">]: never; }>(object: I_1): RivaNLPConfigResponse;
};
export declare const RivaNLPConfigResponse_Config: {
    encode(message: RivaNLPConfigResponse_Config, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RivaNLPConfigResponse_Config;
    fromJSON(object: any): RivaNLPConfigResponse_Config;
    toJSON(message: RivaNLPConfigResponse_Config): unknown;
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
    } & { [K_1 in Exclude<keyof I, keyof RivaNLPConfigResponse_Config>]: never; }>(base?: I): RivaNLPConfigResponse_Config;
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
    } & { [K_3 in Exclude<keyof I_1, keyof RivaNLPConfigResponse_Config>]: never; }>(object: I_1): RivaNLPConfigResponse_Config;
};
export declare const RivaNLPConfigResponse_Config_ParametersEntry: {
    encode(message: RivaNLPConfigResponse_Config_ParametersEntry, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RivaNLPConfigResponse_Config_ParametersEntry;
    fromJSON(object: any): RivaNLPConfigResponse_Config_ParametersEntry;
    toJSON(message: RivaNLPConfigResponse_Config_ParametersEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof RivaNLPConfigResponse_Config_ParametersEntry>]: never; }>(base?: I): RivaNLPConfigResponse_Config_ParametersEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof RivaNLPConfigResponse_Config_ParametersEntry>]: never; }>(object: I_1): RivaNLPConfigResponse_Config_ParametersEntry;
};
export declare const NLPModelParams: {
    encode(message: NLPModelParams, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): NLPModelParams;
    fromJSON(object: any): NLPModelParams;
    toJSON(message: NLPModelParams): unknown;
    create<I extends {
        modelName?: string | undefined;
        languageCode?: string | undefined;
    } & {
        modelName?: string | undefined;
        languageCode?: string | undefined;
    } & { [K in Exclude<keyof I, keyof NLPModelParams>]: never; }>(base?: I): NLPModelParams;
    fromPartial<I_1 extends {
        modelName?: string | undefined;
        languageCode?: string | undefined;
    } & {
        modelName?: string | undefined;
        languageCode?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof NLPModelParams>]: never; }>(object: I_1): NLPModelParams;
};
export declare const TextTransformRequest: {
    encode(message: TextTransformRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TextTransformRequest;
    fromJSON(object: any): TextTransformRequest;
    toJSON(message: TextTransformRequest): unknown;
    create<I extends {
        text?: string[] | undefined;
        topN?: number | undefined;
        model?: {
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        text?: (string[] & string[] & { [K in Exclude<keyof I["text"], keyof string[]>]: never; }) | undefined;
        topN?: number | undefined;
        model?: ({
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } & {
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } & { [K_1 in Exclude<keyof I["model"], keyof NLPModelParams>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_2 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof TextTransformRequest>]: never; }>(base?: I): TextTransformRequest;
    fromPartial<I_1 extends {
        text?: string[] | undefined;
        topN?: number | undefined;
        model?: {
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        text?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["text"], keyof string[]>]: never; }) | undefined;
        topN?: number | undefined;
        model?: ({
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } & {
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } & { [K_5 in Exclude<keyof I_1["model"], keyof NLPModelParams>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_6 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof TextTransformRequest>]: never; }>(object: I_1): TextTransformRequest;
};
export declare const TextTransformResponse: {
    encode(message: TextTransformResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TextTransformResponse;
    fromJSON(object: any): TextTransformResponse;
    toJSON(message: TextTransformResponse): unknown;
    create<I extends {
        text?: string[] | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        text?: (string[] & string[] & { [K in Exclude<keyof I["text"], keyof string[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_1 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof TextTransformResponse>]: never; }>(base?: I): TextTransformResponse;
    fromPartial<I_1 extends {
        text?: string[] | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        text?: (string[] & string[] & { [K_3 in Exclude<keyof I_1["text"], keyof string[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_4 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof TextTransformResponse>]: never; }>(object: I_1): TextTransformResponse;
};
export declare const TextClassRequest: {
    encode(message: TextClassRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TextClassRequest;
    fromJSON(object: any): TextClassRequest;
    toJSON(message: TextClassRequest): unknown;
    create<I extends {
        text?: string[] | undefined;
        topN?: number | undefined;
        model?: {
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        text?: (string[] & string[] & { [K in Exclude<keyof I["text"], keyof string[]>]: never; }) | undefined;
        topN?: number | undefined;
        model?: ({
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } & {
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } & { [K_1 in Exclude<keyof I["model"], keyof NLPModelParams>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_2 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof TextClassRequest>]: never; }>(base?: I): TextClassRequest;
    fromPartial<I_1 extends {
        text?: string[] | undefined;
        topN?: number | undefined;
        model?: {
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        text?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["text"], keyof string[]>]: never; }) | undefined;
        topN?: number | undefined;
        model?: ({
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } & {
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } & { [K_5 in Exclude<keyof I_1["model"], keyof NLPModelParams>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_6 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof TextClassRequest>]: never; }>(object: I_1): TextClassRequest;
};
export declare const Classification: {
    encode(message: Classification, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Classification;
    fromJSON(object: any): Classification;
    toJSON(message: Classification): unknown;
    create<I extends {
        className?: string | undefined;
        score?: number | undefined;
    } & {
        className?: string | undefined;
        score?: number | undefined;
    } & { [K in Exclude<keyof I, keyof Classification>]: never; }>(base?: I): Classification;
    fromPartial<I_1 extends {
        className?: string | undefined;
        score?: number | undefined;
    } & {
        className?: string | undefined;
        score?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Classification>]: never; }>(object: I_1): Classification;
};
export declare const Span: {
    encode(message: Span, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Span;
    fromJSON(object: any): Span;
    toJSON(message: Span): unknown;
    create<I extends {
        start?: number | undefined;
        end?: number | undefined;
    } & {
        start?: number | undefined;
        end?: number | undefined;
    } & { [K in Exclude<keyof I, keyof Span>]: never; }>(base?: I): Span;
    fromPartial<I_1 extends {
        start?: number | undefined;
        end?: number | undefined;
    } & {
        start?: number | undefined;
        end?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Span>]: never; }>(object: I_1): Span;
};
export declare const ClassificationResult: {
    encode(message: ClassificationResult, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): ClassificationResult;
    fromJSON(object: any): ClassificationResult;
    toJSON(message: ClassificationResult): unknown;
    create<I extends {
        labels?: {
            className?: string | undefined;
            score?: number | undefined;
        }[] | undefined;
    } & {
        labels?: ({
            className?: string | undefined;
            score?: number | undefined;
        }[] & ({
            className?: string | undefined;
            score?: number | undefined;
        } & {
            className?: string | undefined;
            score?: number | undefined;
        } & { [K in Exclude<keyof I["labels"][number], keyof Classification>]: never; })[] & { [K_1 in Exclude<keyof I["labels"], keyof {
            className?: string | undefined;
            score?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, "labels">]: never; }>(base?: I): ClassificationResult;
    fromPartial<I_1 extends {
        labels?: {
            className?: string | undefined;
            score?: number | undefined;
        }[] | undefined;
    } & {
        labels?: ({
            className?: string | undefined;
            score?: number | undefined;
        }[] & ({
            className?: string | undefined;
            score?: number | undefined;
        } & {
            className?: string | undefined;
            score?: number | undefined;
        } & { [K_3 in Exclude<keyof I_1["labels"][number], keyof Classification>]: never; })[] & { [K_4 in Exclude<keyof I_1["labels"], keyof {
            className?: string | undefined;
            score?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, "labels">]: never; }>(object: I_1): ClassificationResult;
};
export declare const TextClassResponse: {
    encode(message: TextClassResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TextClassResponse;
    fromJSON(object: any): TextClassResponse;
    toJSON(message: TextClassResponse): unknown;
    create<I extends {
        results?: {
            labels?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
        }[] | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        results?: ({
            labels?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
        }[] & ({
            labels?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
        } & {
            labels?: ({
                className?: string | undefined;
                score?: number | undefined;
            }[] & ({
                className?: string | undefined;
                score?: number | undefined;
            } & {
                className?: string | undefined;
                score?: number | undefined;
            } & { [K in Exclude<keyof I["results"][number]["labels"][number], keyof Classification>]: never; })[] & { [K_1 in Exclude<keyof I["results"][number]["labels"], keyof {
                className?: string | undefined;
                score?: number | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["results"][number], "labels">]: never; })[] & { [K_3 in Exclude<keyof I["results"], keyof {
            labels?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_4 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, keyof TextClassResponse>]: never; }>(base?: I): TextClassResponse;
    fromPartial<I_1 extends {
        results?: {
            labels?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
        }[] | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        results?: ({
            labels?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
        }[] & ({
            labels?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
        } & {
            labels?: ({
                className?: string | undefined;
                score?: number | undefined;
            }[] & ({
                className?: string | undefined;
                score?: number | undefined;
            } & {
                className?: string | undefined;
                score?: number | undefined;
            } & { [K_6 in Exclude<keyof I_1["results"][number]["labels"][number], keyof Classification>]: never; })[] & { [K_7 in Exclude<keyof I_1["results"][number]["labels"], keyof {
                className?: string | undefined;
                score?: number | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_8 in Exclude<keyof I_1["results"][number], "labels">]: never; })[] & { [K_9 in Exclude<keyof I_1["results"], keyof {
            labels?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_10 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_11 in Exclude<keyof I_1, keyof TextClassResponse>]: never; }>(object: I_1): TextClassResponse;
};
export declare const TokenClassRequest: {
    encode(message: TokenClassRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TokenClassRequest;
    fromJSON(object: any): TokenClassRequest;
    toJSON(message: TokenClassRequest): unknown;
    create<I extends {
        text?: string[] | undefined;
        topN?: number | undefined;
        model?: {
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        text?: (string[] & string[] & { [K in Exclude<keyof I["text"], keyof string[]>]: never; }) | undefined;
        topN?: number | undefined;
        model?: ({
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } & {
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } & { [K_1 in Exclude<keyof I["model"], keyof NLPModelParams>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_2 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof TokenClassRequest>]: never; }>(base?: I): TokenClassRequest;
    fromPartial<I_1 extends {
        text?: string[] | undefined;
        topN?: number | undefined;
        model?: {
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        text?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["text"], keyof string[]>]: never; }) | undefined;
        topN?: number | undefined;
        model?: ({
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } & {
            modelName?: string | undefined;
            languageCode?: string | undefined;
        } & { [K_5 in Exclude<keyof I_1["model"], keyof NLPModelParams>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_6 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof TokenClassRequest>]: never; }>(object: I_1): TokenClassRequest;
};
export declare const TokenClassValue: {
    encode(message: TokenClassValue, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TokenClassValue;
    fromJSON(object: any): TokenClassValue;
    toJSON(message: TokenClassValue): unknown;
    create<I extends {
        token?: string | undefined;
        label?: {
            className?: string | undefined;
            score?: number | undefined;
        }[] | undefined;
        span?: {
            start?: number | undefined;
            end?: number | undefined;
        }[] | undefined;
    } & {
        token?: string | undefined;
        label?: ({
            className?: string | undefined;
            score?: number | undefined;
        }[] & ({
            className?: string | undefined;
            score?: number | undefined;
        } & {
            className?: string | undefined;
            score?: number | undefined;
        } & { [K in Exclude<keyof I["label"][number], keyof Classification>]: never; })[] & { [K_1 in Exclude<keyof I["label"], keyof {
            className?: string | undefined;
            score?: number | undefined;
        }[]>]: never; }) | undefined;
        span?: ({
            start?: number | undefined;
            end?: number | undefined;
        }[] & ({
            start?: number | undefined;
            end?: number | undefined;
        } & {
            start?: number | undefined;
            end?: number | undefined;
        } & { [K_2 in Exclude<keyof I["span"][number], keyof Span>]: never; })[] & { [K_3 in Exclude<keyof I["span"], keyof {
            start?: number | undefined;
            end?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, keyof TokenClassValue>]: never; }>(base?: I): TokenClassValue;
    fromPartial<I_1 extends {
        token?: string | undefined;
        label?: {
            className?: string | undefined;
            score?: number | undefined;
        }[] | undefined;
        span?: {
            start?: number | undefined;
            end?: number | undefined;
        }[] | undefined;
    } & {
        token?: string | undefined;
        label?: ({
            className?: string | undefined;
            score?: number | undefined;
        }[] & ({
            className?: string | undefined;
            score?: number | undefined;
        } & {
            className?: string | undefined;
            score?: number | undefined;
        } & { [K_5 in Exclude<keyof I_1["label"][number], keyof Classification>]: never; })[] & { [K_6 in Exclude<keyof I_1["label"], keyof {
            className?: string | undefined;
            score?: number | undefined;
        }[]>]: never; }) | undefined;
        span?: ({
            start?: number | undefined;
            end?: number | undefined;
        }[] & ({
            start?: number | undefined;
            end?: number | undefined;
        } & {
            start?: number | undefined;
            end?: number | undefined;
        } & { [K_7 in Exclude<keyof I_1["span"][number], keyof Span>]: never; })[] & { [K_8 in Exclude<keyof I_1["span"], keyof {
            start?: number | undefined;
            end?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof TokenClassValue>]: never; }>(object: I_1): TokenClassValue;
};
export declare const TokenClassSequence: {
    encode(message: TokenClassSequence, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TokenClassSequence;
    fromJSON(object: any): TokenClassSequence;
    toJSON(message: TokenClassSequence): unknown;
    create<I extends {
        results?: {
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        results?: ({
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        }[] & ({
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        } & {
            token?: string | undefined;
            label?: ({
                className?: string | undefined;
                score?: number | undefined;
            }[] & ({
                className?: string | undefined;
                score?: number | undefined;
            } & {
                className?: string | undefined;
                score?: number | undefined;
            } & { [K in Exclude<keyof I["results"][number]["label"][number], keyof Classification>]: never; })[] & { [K_1 in Exclude<keyof I["results"][number]["label"], keyof {
                className?: string | undefined;
                score?: number | undefined;
            }[]>]: never; }) | undefined;
            span?: ({
                start?: number | undefined;
                end?: number | undefined;
            }[] & ({
                start?: number | undefined;
                end?: number | undefined;
            } & {
                start?: number | undefined;
                end?: number | undefined;
            } & { [K_2 in Exclude<keyof I["results"][number]["span"][number], keyof Span>]: never; })[] & { [K_3 in Exclude<keyof I["results"][number]["span"], keyof {
                start?: number | undefined;
                end?: number | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_4 in Exclude<keyof I["results"][number], keyof TokenClassValue>]: never; })[] & { [K_5 in Exclude<keyof I["results"], keyof {
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, "results">]: never; }>(base?: I): TokenClassSequence;
    fromPartial<I_1 extends {
        results?: {
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        }[] | undefined;
    } & {
        results?: ({
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        }[] & ({
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        } & {
            token?: string | undefined;
            label?: ({
                className?: string | undefined;
                score?: number | undefined;
            }[] & ({
                className?: string | undefined;
                score?: number | undefined;
            } & {
                className?: string | undefined;
                score?: number | undefined;
            } & { [K_7 in Exclude<keyof I_1["results"][number]["label"][number], keyof Classification>]: never; })[] & { [K_8 in Exclude<keyof I_1["results"][number]["label"], keyof {
                className?: string | undefined;
                score?: number | undefined;
            }[]>]: never; }) | undefined;
            span?: ({
                start?: number | undefined;
                end?: number | undefined;
            }[] & ({
                start?: number | undefined;
                end?: number | undefined;
            } & {
                start?: number | undefined;
                end?: number | undefined;
            } & { [K_9 in Exclude<keyof I_1["results"][number]["span"][number], keyof Span>]: never; })[] & { [K_10 in Exclude<keyof I_1["results"][number]["span"], keyof {
                start?: number | undefined;
                end?: number | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_11 in Exclude<keyof I_1["results"][number], keyof TokenClassValue>]: never; })[] & { [K_12 in Exclude<keyof I_1["results"], keyof {
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_13 in Exclude<keyof I_1, "results">]: never; }>(object: I_1): TokenClassSequence;
};
export declare const TokenClassResponse: {
    encode(message: TokenClassResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TokenClassResponse;
    fromJSON(object: any): TokenClassResponse;
    toJSON(message: TokenClassResponse): unknown;
    create<I extends {
        results?: {
            results?: {
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            }[] | undefined;
        }[] | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        results?: ({
            results?: {
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            }[] | undefined;
        }[] & ({
            results?: {
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            results?: ({
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            }[] & ({
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            } & {
                token?: string | undefined;
                label?: ({
                    className?: string | undefined;
                    score?: number | undefined;
                }[] & ({
                    className?: string | undefined;
                    score?: number | undefined;
                } & {
                    className?: string | undefined;
                    score?: number | undefined;
                } & { [K in Exclude<keyof I["results"][number]["results"][number]["label"][number], keyof Classification>]: never; })[] & { [K_1 in Exclude<keyof I["results"][number]["results"][number]["label"], keyof {
                    className?: string | undefined;
                    score?: number | undefined;
                }[]>]: never; }) | undefined;
                span?: ({
                    start?: number | undefined;
                    end?: number | undefined;
                }[] & ({
                    start?: number | undefined;
                    end?: number | undefined;
                } & {
                    start?: number | undefined;
                    end?: number | undefined;
                } & { [K_2 in Exclude<keyof I["results"][number]["results"][number]["span"][number], keyof Span>]: never; })[] & { [K_3 in Exclude<keyof I["results"][number]["results"][number]["span"], keyof {
                    start?: number | undefined;
                    end?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_4 in Exclude<keyof I["results"][number]["results"][number], keyof TokenClassValue>]: never; })[] & { [K_5 in Exclude<keyof I["results"][number]["results"], keyof {
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["results"][number], "results">]: never; })[] & { [K_7 in Exclude<keyof I["results"], keyof {
            results?: {
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_8 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I, keyof TokenClassResponse>]: never; }>(base?: I): TokenClassResponse;
    fromPartial<I_1 extends {
        results?: {
            results?: {
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            }[] | undefined;
        }[] | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        results?: ({
            results?: {
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            }[] | undefined;
        }[] & ({
            results?: {
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            }[] | undefined;
        } & {
            results?: ({
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            }[] & ({
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            } & {
                token?: string | undefined;
                label?: ({
                    className?: string | undefined;
                    score?: number | undefined;
                }[] & ({
                    className?: string | undefined;
                    score?: number | undefined;
                } & {
                    className?: string | undefined;
                    score?: number | undefined;
                } & { [K_10 in Exclude<keyof I_1["results"][number]["results"][number]["label"][number], keyof Classification>]: never; })[] & { [K_11 in Exclude<keyof I_1["results"][number]["results"][number]["label"], keyof {
                    className?: string | undefined;
                    score?: number | undefined;
                }[]>]: never; }) | undefined;
                span?: ({
                    start?: number | undefined;
                    end?: number | undefined;
                }[] & ({
                    start?: number | undefined;
                    end?: number | undefined;
                } & {
                    start?: number | undefined;
                    end?: number | undefined;
                } & { [K_12 in Exclude<keyof I_1["results"][number]["results"][number]["span"][number], keyof Span>]: never; })[] & { [K_13 in Exclude<keyof I_1["results"][number]["results"][number]["span"], keyof {
                    start?: number | undefined;
                    end?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_14 in Exclude<keyof I_1["results"][number]["results"][number], keyof TokenClassValue>]: never; })[] & { [K_15 in Exclude<keyof I_1["results"][number]["results"], keyof {
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_16 in Exclude<keyof I_1["results"][number], "results">]: never; })[] & { [K_17 in Exclude<keyof I_1["results"], keyof {
            results?: {
                token?: string | undefined;
                label?: {
                    className?: string | undefined;
                    score?: number | undefined;
                }[] | undefined;
                span?: {
                    start?: number | undefined;
                    end?: number | undefined;
                }[] | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_18 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_19 in Exclude<keyof I_1, keyof TokenClassResponse>]: never; }>(object: I_1): TokenClassResponse;
};
export declare const AnalyzeIntentContext: {
    encode(_: AnalyzeIntentContext, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AnalyzeIntentContext;
    fromJSON(_: any): AnalyzeIntentContext;
    toJSON(_: AnalyzeIntentContext): unknown;
    create<I extends {} & {} & { [K in Exclude<keyof I, never>]: never; }>(base?: I): AnalyzeIntentContext;
    fromPartial<I_1 extends {} & {} & { [K_1 in Exclude<keyof I_1, never>]: never; }>(_: I_1): AnalyzeIntentContext;
};
export declare const AnalyzeIntentOptions: {
    encode(message: AnalyzeIntentOptions, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AnalyzeIntentOptions;
    fromJSON(object: any): AnalyzeIntentOptions;
    toJSON(message: AnalyzeIntentOptions): unknown;
    create<I extends {
        previousIntent?: string | undefined;
        vectors?: {} | undefined;
        domain?: string | undefined;
        lang?: string | undefined;
    } & {
        previousIntent?: string | undefined;
        vectors?: ({} & {} & { [K in Exclude<keyof I["vectors"], never>]: never; }) | undefined;
        domain?: string | undefined;
        lang?: string | undefined;
    } & { [K_1 in Exclude<keyof I, keyof AnalyzeIntentOptions>]: never; }>(base?: I): AnalyzeIntentOptions;
    fromPartial<I_1 extends {
        previousIntent?: string | undefined;
        vectors?: {} | undefined;
        domain?: string | undefined;
        lang?: string | undefined;
    } & {
        previousIntent?: string | undefined;
        vectors?: ({} & {} & { [K_2 in Exclude<keyof I_1["vectors"], never>]: never; }) | undefined;
        domain?: string | undefined;
        lang?: string | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof AnalyzeIntentOptions>]: never; }>(object: I_1): AnalyzeIntentOptions;
};
export declare const AnalyzeIntentRequest: {
    encode(message: AnalyzeIntentRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AnalyzeIntentRequest;
    fromJSON(object: any): AnalyzeIntentRequest;
    toJSON(message: AnalyzeIntentRequest): unknown;
    create<I extends {
        query?: string | undefined;
        options?: {
            previousIntent?: string | undefined;
            vectors?: {} | undefined;
            domain?: string | undefined;
            lang?: string | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        query?: string | undefined;
        options?: ({
            previousIntent?: string | undefined;
            vectors?: {} | undefined;
            domain?: string | undefined;
            lang?: string | undefined;
        } & {
            previousIntent?: string | undefined;
            vectors?: ({} & {} & { [K in Exclude<keyof I["options"]["vectors"], never>]: never; }) | undefined;
            domain?: string | undefined;
            lang?: string | undefined;
        } & { [K_1 in Exclude<keyof I["options"], keyof AnalyzeIntentOptions>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_2 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof AnalyzeIntentRequest>]: never; }>(base?: I): AnalyzeIntentRequest;
    fromPartial<I_1 extends {
        query?: string | undefined;
        options?: {
            previousIntent?: string | undefined;
            vectors?: {} | undefined;
            domain?: string | undefined;
            lang?: string | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        query?: string | undefined;
        options?: ({
            previousIntent?: string | undefined;
            vectors?: {} | undefined;
            domain?: string | undefined;
            lang?: string | undefined;
        } & {
            previousIntent?: string | undefined;
            vectors?: ({} & {} & { [K_4 in Exclude<keyof I_1["options"]["vectors"], never>]: never; }) | undefined;
            domain?: string | undefined;
            lang?: string | undefined;
        } & { [K_5 in Exclude<keyof I_1["options"], keyof AnalyzeIntentOptions>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_6 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof AnalyzeIntentRequest>]: never; }>(object: I_1): AnalyzeIntentRequest;
};
export declare const AnalyzeIntentResponse: {
    encode(message: AnalyzeIntentResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AnalyzeIntentResponse;
    fromJSON(object: any): AnalyzeIntentResponse;
    toJSON(message: AnalyzeIntentResponse): unknown;
    create<I extends {
        intent?: {
            className?: string | undefined;
            score?: number | undefined;
        } | undefined;
        slots?: {
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        }[] | undefined;
        domainStr?: string | undefined;
        domain?: {
            className?: string | undefined;
            score?: number | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        intent?: ({
            className?: string | undefined;
            score?: number | undefined;
        } & {
            className?: string | undefined;
            score?: number | undefined;
        } & { [K in Exclude<keyof I["intent"], keyof Classification>]: never; }) | undefined;
        slots?: ({
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        }[] & ({
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        } & {
            token?: string | undefined;
            label?: ({
                className?: string | undefined;
                score?: number | undefined;
            }[] & ({
                className?: string | undefined;
                score?: number | undefined;
            } & {
                className?: string | undefined;
                score?: number | undefined;
            } & { [K_1 in Exclude<keyof I["slots"][number]["label"][number], keyof Classification>]: never; })[] & { [K_2 in Exclude<keyof I["slots"][number]["label"], keyof {
                className?: string | undefined;
                score?: number | undefined;
            }[]>]: never; }) | undefined;
            span?: ({
                start?: number | undefined;
                end?: number | undefined;
            }[] & ({
                start?: number | undefined;
                end?: number | undefined;
            } & {
                start?: number | undefined;
                end?: number | undefined;
            } & { [K_3 in Exclude<keyof I["slots"][number]["span"][number], keyof Span>]: never; })[] & { [K_4 in Exclude<keyof I["slots"][number]["span"], keyof {
                start?: number | undefined;
                end?: number | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_5 in Exclude<keyof I["slots"][number], keyof TokenClassValue>]: never; })[] & { [K_6 in Exclude<keyof I["slots"], keyof {
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
        domainStr?: string | undefined;
        domain?: ({
            className?: string | undefined;
            score?: number | undefined;
        } & {
            className?: string | undefined;
            score?: number | undefined;
        } & { [K_7 in Exclude<keyof I["domain"], keyof Classification>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_8 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I, keyof AnalyzeIntentResponse>]: never; }>(base?: I): AnalyzeIntentResponse;
    fromPartial<I_1 extends {
        intent?: {
            className?: string | undefined;
            score?: number | undefined;
        } | undefined;
        slots?: {
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        }[] | undefined;
        domainStr?: string | undefined;
        domain?: {
            className?: string | undefined;
            score?: number | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        intent?: ({
            className?: string | undefined;
            score?: number | undefined;
        } & {
            className?: string | undefined;
            score?: number | undefined;
        } & { [K_10 in Exclude<keyof I_1["intent"], keyof Classification>]: never; }) | undefined;
        slots?: ({
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        }[] & ({
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        } & {
            token?: string | undefined;
            label?: ({
                className?: string | undefined;
                score?: number | undefined;
            }[] & ({
                className?: string | undefined;
                score?: number | undefined;
            } & {
                className?: string | undefined;
                score?: number | undefined;
            } & { [K_11 in Exclude<keyof I_1["slots"][number]["label"][number], keyof Classification>]: never; })[] & { [K_12 in Exclude<keyof I_1["slots"][number]["label"], keyof {
                className?: string | undefined;
                score?: number | undefined;
            }[]>]: never; }) | undefined;
            span?: ({
                start?: number | undefined;
                end?: number | undefined;
            }[] & ({
                start?: number | undefined;
                end?: number | undefined;
            } & {
                start?: number | undefined;
                end?: number | undefined;
            } & { [K_13 in Exclude<keyof I_1["slots"][number]["span"][number], keyof Span>]: never; })[] & { [K_14 in Exclude<keyof I_1["slots"][number]["span"], keyof {
                start?: number | undefined;
                end?: number | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_15 in Exclude<keyof I_1["slots"][number], keyof TokenClassValue>]: never; })[] & { [K_16 in Exclude<keyof I_1["slots"], keyof {
            token?: string | undefined;
            label?: {
                className?: string | undefined;
                score?: number | undefined;
            }[] | undefined;
            span?: {
                start?: number | undefined;
                end?: number | undefined;
            }[] | undefined;
        }[]>]: never; }) | undefined;
        domainStr?: string | undefined;
        domain?: ({
            className?: string | undefined;
            score?: number | undefined;
        } & {
            className?: string | undefined;
            score?: number | undefined;
        } & { [K_17 in Exclude<keyof I_1["domain"], keyof Classification>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_18 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_19 in Exclude<keyof I_1, keyof AnalyzeIntentResponse>]: never; }>(object: I_1): AnalyzeIntentResponse;
};
export declare const AnalyzeEntitiesOptions: {
    encode(message: AnalyzeEntitiesOptions, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AnalyzeEntitiesOptions;
    fromJSON(object: any): AnalyzeEntitiesOptions;
    toJSON(message: AnalyzeEntitiesOptions): unknown;
    create<I extends {
        lang?: string | undefined;
    } & {
        lang?: string | undefined;
    } & { [K in Exclude<keyof I, "lang">]: never; }>(base?: I): AnalyzeEntitiesOptions;
    fromPartial<I_1 extends {
        lang?: string | undefined;
    } & {
        lang?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "lang">]: never; }>(object: I_1): AnalyzeEntitiesOptions;
};
export declare const AnalyzeEntitiesRequest: {
    encode(message: AnalyzeEntitiesRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AnalyzeEntitiesRequest;
    fromJSON(object: any): AnalyzeEntitiesRequest;
    toJSON(message: AnalyzeEntitiesRequest): unknown;
    create<I extends {
        query?: string | undefined;
        options?: {
            lang?: string | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        query?: string | undefined;
        options?: ({
            lang?: string | undefined;
        } & {
            lang?: string | undefined;
        } & { [K in Exclude<keyof I["options"], "lang">]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_1 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof AnalyzeEntitiesRequest>]: never; }>(base?: I): AnalyzeEntitiesRequest;
    fromPartial<I_1 extends {
        query?: string | undefined;
        options?: {
            lang?: string | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        query?: string | undefined;
        options?: ({
            lang?: string | undefined;
        } & {
            lang?: string | undefined;
        } & { [K_3 in Exclude<keyof I_1["options"], "lang">]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_4 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof AnalyzeEntitiesRequest>]: never; }>(object: I_1): AnalyzeEntitiesRequest;
};
export declare const NaturalQueryRequest: {
    encode(message: NaturalQueryRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): NaturalQueryRequest;
    fromJSON(object: any): NaturalQueryRequest;
    toJSON(message: NaturalQueryRequest): unknown;
    create<I extends {
        query?: string | undefined;
        topN?: number | undefined;
        context?: string | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        query?: string | undefined;
        topN?: number | undefined;
        context?: string | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_1 in Exclude<keyof I, keyof NaturalQueryRequest>]: never; }>(base?: I): NaturalQueryRequest;
    fromPartial<I_1 extends {
        query?: string | undefined;
        topN?: number | undefined;
        context?: string | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        query?: string | undefined;
        topN?: number | undefined;
        context?: string | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_2 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof NaturalQueryRequest>]: never; }>(object: I_1): NaturalQueryRequest;
};
export declare const NaturalQueryResult: {
    encode(message: NaturalQueryResult, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): NaturalQueryResult;
    fromJSON(object: any): NaturalQueryResult;
    toJSON(message: NaturalQueryResult): unknown;
    create<I extends {
        answer?: string | undefined;
        score?: number | undefined;
    } & {
        answer?: string | undefined;
        score?: number | undefined;
    } & { [K in Exclude<keyof I, keyof NaturalQueryResult>]: never; }>(base?: I): NaturalQueryResult;
    fromPartial<I_1 extends {
        answer?: string | undefined;
        score?: number | undefined;
    } & {
        answer?: string | undefined;
        score?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof NaturalQueryResult>]: never; }>(object: I_1): NaturalQueryResult;
};
export declare const NaturalQueryResponse: {
    encode(message: NaturalQueryResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): NaturalQueryResponse;
    fromJSON(object: any): NaturalQueryResponse;
    toJSON(message: NaturalQueryResponse): unknown;
    create<I extends {
        results?: {
            answer?: string | undefined;
            score?: number | undefined;
        }[] | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        results?: ({
            answer?: string | undefined;
            score?: number | undefined;
        }[] & ({
            answer?: string | undefined;
            score?: number | undefined;
        } & {
            answer?: string | undefined;
            score?: number | undefined;
        } & { [K in Exclude<keyof I["results"][number], keyof NaturalQueryResult>]: never; })[] & { [K_1 in Exclude<keyof I["results"], keyof {
            answer?: string | undefined;
            score?: number | undefined;
        }[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_2 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof NaturalQueryResponse>]: never; }>(base?: I): NaturalQueryResponse;
    fromPartial<I_1 extends {
        results?: {
            answer?: string | undefined;
            score?: number | undefined;
        }[] | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        results?: ({
            answer?: string | undefined;
            score?: number | undefined;
        }[] & ({
            answer?: string | undefined;
            score?: number | undefined;
        } & {
            answer?: string | undefined;
            score?: number | undefined;
        } & { [K_4 in Exclude<keyof I_1["results"][number], keyof NaturalQueryResult>]: never; })[] & { [K_5 in Exclude<keyof I_1["results"], keyof {
            answer?: string | undefined;
            score?: number | undefined;
        }[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_6 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof NaturalQueryResponse>]: never; }>(object: I_1): NaturalQueryResponse;
};
export type RivaLanguageUnderstandingService = typeof RivaLanguageUnderstandingService;
export declare const RivaLanguageUnderstandingService: {
    /**
     * ClassifyText takes as input an input/query string and parameters related
     * to the requested model to use to evaluate the text. The service evaluates
     * the text with the requested model, and returns one or more classifications.
     *
     * @deprecated
     */
    readonly classifyText: {
        readonly path: "/nvidia.riva.nlp.RivaLanguageUnderstanding/ClassifyText";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: TextClassRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => TextClassRequest;
        readonly responseSerialize: (value: TextClassResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => TextClassResponse;
    };
    /**
     * ClassifyTokens takes as input either a string or list of tokens and
     * parameters related to which model to use. The service evaluates the text
     * with the requested model, performing additional tokenization if necessary,
     * and returns one or more class labels per token.
     *
     * @deprecated
     */
    readonly classifyTokens: {
        readonly path: "/nvidia.riva.nlp.RivaLanguageUnderstanding/ClassifyTokens";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: TokenClassRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => TokenClassRequest;
        readonly responseSerialize: (value: TokenClassResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => TokenClassResponse;
    };
    /**
     * TransformText takes an input/query string and parameters related to the
     * requested model and returns another string. The behavior of the function
     * is defined entirely by the underlying model and may be used for
     * tasks like translation, adding punctuation, augment the input directly,
     * etc.
     */
    readonly transformText: {
        readonly path: "/nvidia.riva.nlp.RivaLanguageUnderstanding/TransformText";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: TextTransformRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => TextTransformRequest;
        readonly responseSerialize: (value: TextTransformResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => TextTransformResponse;
    };
    /**
     * AnalyzeEntities accepts an input string and returns all named entities
     * within the text, as well as a category and likelihood.
     *
     * @deprecated
     */
    readonly analyzeEntities: {
        readonly path: "/nvidia.riva.nlp.RivaLanguageUnderstanding/AnalyzeEntities";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: AnalyzeEntitiesRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => AnalyzeEntitiesRequest;
        readonly responseSerialize: (value: TokenClassResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => TokenClassResponse;
    };
    /**
     * AnalyzeIntent accepts an input string and returns the most likely
     * intent as well as slots relevant to that intent.
     *
     * The model requires that a valid "domain" be passed in, and optionally
     * supports including a previous intent classification result to provide
     * context for the model.
     *
     * @deprecated
     */
    readonly analyzeIntent: {
        readonly path: "/nvidia.riva.nlp.RivaLanguageUnderstanding/AnalyzeIntent";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: AnalyzeIntentRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => AnalyzeIntentRequest;
        readonly responseSerialize: (value: AnalyzeIntentResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => AnalyzeIntentResponse;
    };
    /**
     * PunctuateText takes text with no- or limited- punctuation and returns
     * the same text with corrected punctuation and capitalization.
     */
    readonly punctuateText: {
        readonly path: "/nvidia.riva.nlp.RivaLanguageUnderstanding/PunctuateText";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: TextTransformRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => TextTransformRequest;
        readonly responseSerialize: (value: TextTransformResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => TextTransformResponse;
    };
    /**
     * NaturalQuery is a search function that enables querying one or more
     * documents or contexts with a query that is written in natural language.
     *
     * @deprecated
     */
    readonly naturalQuery: {
        readonly path: "/nvidia.riva.nlp.RivaLanguageUnderstanding/NaturalQuery";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: NaturalQueryRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => NaturalQueryRequest;
        readonly responseSerialize: (value: NaturalQueryResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => NaturalQueryResponse;
    };
    /**
     * Enables clients to request the configuration of the current ASR service, or
     * a specific model within the service.
     */
    readonly getRivaNlpConfig: {
        readonly path: "/nvidia.riva.nlp.RivaLanguageUnderstanding/GetRivaNLPConfig";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: RivaNLPConfigRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => RivaNLPConfigRequest;
        readonly responseSerialize: (value: RivaNLPConfigResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => RivaNLPConfigResponse;
    };
};
export interface RivaLanguageUnderstandingServer extends UntypedServiceImplementation {
    /**
     * ClassifyText takes as input an input/query string and parameters related
     * to the requested model to use to evaluate the text. The service evaluates
     * the text with the requested model, and returns one or more classifications.
     *
     * @deprecated
     */
    classifyText: handleUnaryCall<TextClassRequest, TextClassResponse>;
    /**
     * ClassifyTokens takes as input either a string or list of tokens and
     * parameters related to which model to use. The service evaluates the text
     * with the requested model, performing additional tokenization if necessary,
     * and returns one or more class labels per token.
     *
     * @deprecated
     */
    classifyTokens: handleUnaryCall<TokenClassRequest, TokenClassResponse>;
    /**
     * TransformText takes an input/query string and parameters related to the
     * requested model and returns another string. The behavior of the function
     * is defined entirely by the underlying model and may be used for
     * tasks like translation, adding punctuation, augment the input directly,
     * etc.
     */
    transformText: handleUnaryCall<TextTransformRequest, TextTransformResponse>;
    /**
     * AnalyzeEntities accepts an input string and returns all named entities
     * within the text, as well as a category and likelihood.
     *
     * @deprecated
     */
    analyzeEntities: handleUnaryCall<AnalyzeEntitiesRequest, TokenClassResponse>;
    /**
     * AnalyzeIntent accepts an input string and returns the most likely
     * intent as well as slots relevant to that intent.
     *
     * The model requires that a valid "domain" be passed in, and optionally
     * supports including a previous intent classification result to provide
     * context for the model.
     *
     * @deprecated
     */
    analyzeIntent: handleUnaryCall<AnalyzeIntentRequest, AnalyzeIntentResponse>;
    /**
     * PunctuateText takes text with no- or limited- punctuation and returns
     * the same text with corrected punctuation and capitalization.
     */
    punctuateText: handleUnaryCall<TextTransformRequest, TextTransformResponse>;
    /**
     * NaturalQuery is a search function that enables querying one or more
     * documents or contexts with a query that is written in natural language.
     *
     * @deprecated
     */
    naturalQuery: handleUnaryCall<NaturalQueryRequest, NaturalQueryResponse>;
    /**
     * Enables clients to request the configuration of the current ASR service, or
     * a specific model within the service.
     */
    getRivaNlpConfig: handleUnaryCall<RivaNLPConfigRequest, RivaNLPConfigResponse>;
}
export interface RivaLanguageUnderstandingClient extends Client {
    /**
     * ClassifyText takes as input an input/query string and parameters related
     * to the requested model to use to evaluate the text. The service evaluates
     * the text with the requested model, and returns one or more classifications.
     *
     * @deprecated
     */
    classifyText(request: TextClassRequest, callback: (error: ServiceError | null, response: TextClassResponse) => void): ClientUnaryCall;
    classifyText(request: TextClassRequest, metadata: Metadata, callback: (error: ServiceError | null, response: TextClassResponse) => void): ClientUnaryCall;
    classifyText(request: TextClassRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: TextClassResponse) => void): ClientUnaryCall;
    /**
     * ClassifyTokens takes as input either a string or list of tokens and
     * parameters related to which model to use. The service evaluates the text
     * with the requested model, performing additional tokenization if necessary,
     * and returns one or more class labels per token.
     *
     * @deprecated
     */
    classifyTokens(request: TokenClassRequest, callback: (error: ServiceError | null, response: TokenClassResponse) => void): ClientUnaryCall;
    classifyTokens(request: TokenClassRequest, metadata: Metadata, callback: (error: ServiceError | null, response: TokenClassResponse) => void): ClientUnaryCall;
    classifyTokens(request: TokenClassRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: TokenClassResponse) => void): ClientUnaryCall;
    /**
     * TransformText takes an input/query string and parameters related to the
     * requested model and returns another string. The behavior of the function
     * is defined entirely by the underlying model and may be used for
     * tasks like translation, adding punctuation, augment the input directly,
     * etc.
     */
    transformText(request: TextTransformRequest, callback: (error: ServiceError | null, response: TextTransformResponse) => void): ClientUnaryCall;
    transformText(request: TextTransformRequest, metadata: Metadata, callback: (error: ServiceError | null, response: TextTransformResponse) => void): ClientUnaryCall;
    transformText(request: TextTransformRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: TextTransformResponse) => void): ClientUnaryCall;
    /**
     * AnalyzeEntities accepts an input string and returns all named entities
     * within the text, as well as a category and likelihood.
     *
     * @deprecated
     */
    analyzeEntities(request: AnalyzeEntitiesRequest, callback: (error: ServiceError | null, response: TokenClassResponse) => void): ClientUnaryCall;
    analyzeEntities(request: AnalyzeEntitiesRequest, metadata: Metadata, callback: (error: ServiceError | null, response: TokenClassResponse) => void): ClientUnaryCall;
    analyzeEntities(request: AnalyzeEntitiesRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: TokenClassResponse) => void): ClientUnaryCall;
    /**
     * AnalyzeIntent accepts an input string and returns the most likely
     * intent as well as slots relevant to that intent.
     *
     * The model requires that a valid "domain" be passed in, and optionally
     * supports including a previous intent classification result to provide
     * context for the model.
     *
     * @deprecated
     */
    analyzeIntent(request: AnalyzeIntentRequest, callback: (error: ServiceError | null, response: AnalyzeIntentResponse) => void): ClientUnaryCall;
    analyzeIntent(request: AnalyzeIntentRequest, metadata: Metadata, callback: (error: ServiceError | null, response: AnalyzeIntentResponse) => void): ClientUnaryCall;
    analyzeIntent(request: AnalyzeIntentRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: AnalyzeIntentResponse) => void): ClientUnaryCall;
    /**
     * PunctuateText takes text with no- or limited- punctuation and returns
     * the same text with corrected punctuation and capitalization.
     */
    punctuateText(request: TextTransformRequest, callback: (error: ServiceError | null, response: TextTransformResponse) => void): ClientUnaryCall;
    punctuateText(request: TextTransformRequest, metadata: Metadata, callback: (error: ServiceError | null, response: TextTransformResponse) => void): ClientUnaryCall;
    punctuateText(request: TextTransformRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: TextTransformResponse) => void): ClientUnaryCall;
    /**
     * NaturalQuery is a search function that enables querying one or more
     * documents or contexts with a query that is written in natural language.
     *
     * @deprecated
     */
    naturalQuery(request: NaturalQueryRequest, callback: (error: ServiceError | null, response: NaturalQueryResponse) => void): ClientUnaryCall;
    naturalQuery(request: NaturalQueryRequest, metadata: Metadata, callback: (error: ServiceError | null, response: NaturalQueryResponse) => void): ClientUnaryCall;
    naturalQuery(request: NaturalQueryRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: NaturalQueryResponse) => void): ClientUnaryCall;
    /**
     * Enables clients to request the configuration of the current ASR service, or
     * a specific model within the service.
     */
    getRivaNlpConfig(request: RivaNLPConfigRequest, callback: (error: ServiceError | null, response: RivaNLPConfigResponse) => void): ClientUnaryCall;
    getRivaNlpConfig(request: RivaNLPConfigRequest, metadata: Metadata, callback: (error: ServiceError | null, response: RivaNLPConfigResponse) => void): ClientUnaryCall;
    getRivaNlpConfig(request: RivaNLPConfigRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: RivaNLPConfigResponse) => void): ClientUnaryCall;
}
export declare const RivaLanguageUnderstandingClient: {
    new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): RivaLanguageUnderstandingClient;
    service: typeof RivaLanguageUnderstandingService;
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
