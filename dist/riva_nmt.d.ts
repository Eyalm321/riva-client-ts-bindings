/// <reference types="node" />
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { type CallOptions, ChannelCredentials, Client, ClientDuplexStream, type ClientOptions, type ClientUnaryCall, handleBidiStreamingCall, type handleUnaryCall, Metadata, type ServiceError, type UntypedServiceImplementation } from "@grpc/grpc-js";
import { StreamingRecognitionConfig, StreamingRecognitionResult } from "./riva_asr";
import { AudioEncoding } from "./riva_audio";
import { RequestId } from "./riva_common";
import { SynthesizeSpeechResponse } from "./riva_tts";
export declare const protobufPackage = "nvidia.riva.nmt";
/** Configuration for Translate S2S.  reuse existing protos from other services. */
export interface StreamingTranslateSpeechToSpeechConfig {
    /** From riva_asr.proto */
    asrConfig: StreamingRecognitionConfig | undefined;
    ttsConfig: SynthesizeSpeechConfig | undefined;
    translationConfig: TranslationConfig | undefined;
}
/**
 * Streaming translate speech to speech used to configure the entire pipline for
 * speech translation.  This can be be backed by a cascade of ASR, NMT, TTS
 * models or an end to end model
 */
export interface StreamingTranslateSpeechToSpeechRequest {
    config?: StreamingTranslateSpeechToSpeechConfig | undefined;
    audioContent?: Uint8Array | undefined;
    /**
     * The ID to be associated with the request. If provided, this will be
     * returned in the corresponding response.
     */
    id: RequestId | undefined;
}
export interface TranslationConfig {
    /** BCP-47 "en-US" */
    sourceLanguageCode: string;
    targetLanguageCode: string;
    modelName: string;
}
export interface SynthesizeSpeechConfig {
    encoding: AudioEncoding;
    sampleRateHz: number;
    voiceName: string;
    languageCode: string;
    prosodyRate: string;
    prosodyPitch: string;
    prosodyVolume: string;
}
export interface StreamingTranslateSpeechToSpeechResponse {
    /**
     * Contains speech responses, the last response sends an empty buffer to mark
     * the end of stream.
     */
    speech: SynthesizeSpeechResponse | undefined;
    /** The ID associated with the request */
    id: RequestId | undefined;
}
export interface StreamingTranslateSpeechToTextRequest {
    config?: StreamingTranslateSpeechToTextConfig | undefined;
    audioContent?: Uint8Array | undefined;
    /**
     * The ID to be associated with the request. If provided, this will be
     * returned in the corresponding response.
     */
    id: RequestId | undefined;
}
export interface StreamingTranslateSpeechToTextResponse {
    /** from riva_asr.proto */
    results: StreamingRecognitionResult[];
    /** The ID associated with the request */
    id: RequestId | undefined;
}
export interface StreamingTranslateSpeechToTextConfig {
    /** existing ASR config */
    asrConfig: StreamingRecognitionConfig | undefined;
    translationConfig: TranslationConfig | undefined;
}
/**
 * request for synchronous translation of each text in texts.
 * Available languages can be queried using ListSupportLanguagePairs RPC.
 * source and target languages must be specified, are currently two character
 * ISO codes, this will likely change to BCP-47 inline with other Riva Services
 * for GA.
 */
export interface TranslateTextRequest {
    texts: string[];
    model: string;
    sourceLanguage: string;
    targetLanguage: string;
    /**
     * The ID to be associated with the request. If provided, this will be
     * returned in the corresponding response.
     */
    id: RequestId | undefined;
}
/**
 * contains a single translation, collecting into the translate text response
 * Includes the target language code, since with multi lingual models there are
 * multiple possibilities.
 */
export interface Translation {
    text: string;
    language: string;
}
/**
 * Translations are returned as text:language pairs.  These are 1:1 for the
 * passed in 'texts' from the request.
 */
export interface TranslateTextResponse {
    translations: Translation[];
    /** The ID associated with the request */
    id: RequestId | undefined;
}
/**
 * Returns a map of model names to its source and target language pairs.
 * Can specificy a specific model name to retrieve only its language pairs.
 */
export interface AvailableLanguageRequest {
    /** If empty returns all available languages. */
    model: string;
}
/**
 * Language pairs are the sets of src to tgt languages available per model.
 * languages contains all the model_name -> Language pair
 */
export interface AvailableLanguageResponse {
    languages: {
        [key: string]: AvailableLanguageResponse_LanguagePair;
    };
}
export interface AvailableLanguageResponse_LanguagePair {
    srcLang: string[];
    tgtLang: string[];
}
export interface AvailableLanguageResponse_LanguagesEntry {
    key: string;
    value: AvailableLanguageResponse_LanguagePair | undefined;
}
export declare const StreamingTranslateSpeechToSpeechConfig: {
    encode(message: StreamingTranslateSpeechToSpeechConfig, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StreamingTranslateSpeechToSpeechConfig;
    fromJSON(object: any): StreamingTranslateSpeechToSpeechConfig;
    toJSON(message: StreamingTranslateSpeechToSpeechConfig): unknown;
    create<I extends {
        asrConfig?: {
            config?: {
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } | undefined;
                customConfiguration?: {
                    [x: string]: string | undefined;
                } | undefined;
                endpointingConfig?: {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } | undefined;
            } | undefined;
            interimResults?: boolean | undefined;
        } | undefined;
        ttsConfig?: {
            encoding?: AudioEncoding | undefined;
            sampleRateHz?: number | undefined;
            voiceName?: string | undefined;
            languageCode?: string | undefined;
            prosodyRate?: string | undefined;
            prosodyPitch?: string | undefined;
            prosodyVolume?: string | undefined;
        } | undefined;
        translationConfig?: {
            sourceLanguageCode?: string | undefined;
            targetLanguageCode?: string | undefined;
            modelName?: string | undefined;
        } | undefined;
    } & {
        asrConfig?: ({
            config?: {
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } | undefined;
                customConfiguration?: {
                    [x: string]: string | undefined;
                } | undefined;
                endpointingConfig?: {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } | undefined;
            } | undefined;
            interimResults?: boolean | undefined;
        } & {
            config?: ({
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } | undefined;
                customConfiguration?: {
                    [x: string]: string | undefined;
                } | undefined;
                endpointingConfig?: {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } | undefined;
            } & {
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: ({
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] & ({
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                } & {
                    phrases?: (string[] & string[] & { [K in Exclude<keyof I["asrConfig"]["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                    boost?: number | undefined;
                } & { [K_1 in Exclude<keyof I["asrConfig"]["config"]["speechContexts"][number], keyof import("./riva_asr").SpeechContext>]: never; })[] & { [K_2 in Exclude<keyof I["asrConfig"]["config"]["speechContexts"], keyof {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[]>]: never; }) | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: ({
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } & {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } & { [K_3 in Exclude<keyof I["asrConfig"]["config"]["diarizationConfig"], keyof import("./riva_asr").SpeakerDiarizationConfig>]: never; }) | undefined;
                customConfiguration?: ({
                    [x: string]: string | undefined;
                } & {
                    [x: string]: string | undefined;
                } & { [K_4 in Exclude<keyof I["asrConfig"]["config"]["customConfiguration"], string | number>]: never; }) | undefined;
                endpointingConfig?: ({
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } & {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } & { [K_5 in Exclude<keyof I["asrConfig"]["config"]["endpointingConfig"], keyof import("./riva_asr").EndpointingConfig>]: never; }) | undefined;
            } & { [K_6 in Exclude<keyof I["asrConfig"]["config"], keyof import("./riva_asr").RecognitionConfig>]: never; }) | undefined;
            interimResults?: boolean | undefined;
        } & { [K_7 in Exclude<keyof I["asrConfig"], keyof StreamingRecognitionConfig>]: never; }) | undefined;
        ttsConfig?: ({
            encoding?: AudioEncoding | undefined;
            sampleRateHz?: number | undefined;
            voiceName?: string | undefined;
            languageCode?: string | undefined;
            prosodyRate?: string | undefined;
            prosodyPitch?: string | undefined;
            prosodyVolume?: string | undefined;
        } & {
            encoding?: AudioEncoding | undefined;
            sampleRateHz?: number | undefined;
            voiceName?: string | undefined;
            languageCode?: string | undefined;
            prosodyRate?: string | undefined;
            prosodyPitch?: string | undefined;
            prosodyVolume?: string | undefined;
        } & { [K_8 in Exclude<keyof I["ttsConfig"], keyof SynthesizeSpeechConfig>]: never; }) | undefined;
        translationConfig?: ({
            sourceLanguageCode?: string | undefined;
            targetLanguageCode?: string | undefined;
            modelName?: string | undefined;
        } & {
            sourceLanguageCode?: string | undefined;
            targetLanguageCode?: string | undefined;
            modelName?: string | undefined;
        } & { [K_9 in Exclude<keyof I["translationConfig"], keyof TranslationConfig>]: never; }) | undefined;
    } & { [K_10 in Exclude<keyof I, keyof StreamingTranslateSpeechToSpeechConfig>]: never; }>(base?: I): StreamingTranslateSpeechToSpeechConfig;
    fromPartial<I_1 extends {
        asrConfig?: {
            config?: {
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } | undefined;
                customConfiguration?: {
                    [x: string]: string | undefined;
                } | undefined;
                endpointingConfig?: {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } | undefined;
            } | undefined;
            interimResults?: boolean | undefined;
        } | undefined;
        ttsConfig?: {
            encoding?: AudioEncoding | undefined;
            sampleRateHz?: number | undefined;
            voiceName?: string | undefined;
            languageCode?: string | undefined;
            prosodyRate?: string | undefined;
            prosodyPitch?: string | undefined;
            prosodyVolume?: string | undefined;
        } | undefined;
        translationConfig?: {
            sourceLanguageCode?: string | undefined;
            targetLanguageCode?: string | undefined;
            modelName?: string | undefined;
        } | undefined;
    } & {
        asrConfig?: ({
            config?: {
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } | undefined;
                customConfiguration?: {
                    [x: string]: string | undefined;
                } | undefined;
                endpointingConfig?: {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } | undefined;
            } | undefined;
            interimResults?: boolean | undefined;
        } & {
            config?: ({
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } | undefined;
                customConfiguration?: {
                    [x: string]: string | undefined;
                } | undefined;
                endpointingConfig?: {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } | undefined;
            } & {
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: ({
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] & ({
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                } & {
                    phrases?: (string[] & string[] & { [K_11 in Exclude<keyof I_1["asrConfig"]["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                    boost?: number | undefined;
                } & { [K_12 in Exclude<keyof I_1["asrConfig"]["config"]["speechContexts"][number], keyof import("./riva_asr").SpeechContext>]: never; })[] & { [K_13 in Exclude<keyof I_1["asrConfig"]["config"]["speechContexts"], keyof {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[]>]: never; }) | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: ({
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } & {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } & { [K_14 in Exclude<keyof I_1["asrConfig"]["config"]["diarizationConfig"], keyof import("./riva_asr").SpeakerDiarizationConfig>]: never; }) | undefined;
                customConfiguration?: ({
                    [x: string]: string | undefined;
                } & {
                    [x: string]: string | undefined;
                } & { [K_15 in Exclude<keyof I_1["asrConfig"]["config"]["customConfiguration"], string | number>]: never; }) | undefined;
                endpointingConfig?: ({
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } & {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } & { [K_16 in Exclude<keyof I_1["asrConfig"]["config"]["endpointingConfig"], keyof import("./riva_asr").EndpointingConfig>]: never; }) | undefined;
            } & { [K_17 in Exclude<keyof I_1["asrConfig"]["config"], keyof import("./riva_asr").RecognitionConfig>]: never; }) | undefined;
            interimResults?: boolean | undefined;
        } & { [K_18 in Exclude<keyof I_1["asrConfig"], keyof StreamingRecognitionConfig>]: never; }) | undefined;
        ttsConfig?: ({
            encoding?: AudioEncoding | undefined;
            sampleRateHz?: number | undefined;
            voiceName?: string | undefined;
            languageCode?: string | undefined;
            prosodyRate?: string | undefined;
            prosodyPitch?: string | undefined;
            prosodyVolume?: string | undefined;
        } & {
            encoding?: AudioEncoding | undefined;
            sampleRateHz?: number | undefined;
            voiceName?: string | undefined;
            languageCode?: string | undefined;
            prosodyRate?: string | undefined;
            prosodyPitch?: string | undefined;
            prosodyVolume?: string | undefined;
        } & { [K_19 in Exclude<keyof I_1["ttsConfig"], keyof SynthesizeSpeechConfig>]: never; }) | undefined;
        translationConfig?: ({
            sourceLanguageCode?: string | undefined;
            targetLanguageCode?: string | undefined;
            modelName?: string | undefined;
        } & {
            sourceLanguageCode?: string | undefined;
            targetLanguageCode?: string | undefined;
            modelName?: string | undefined;
        } & { [K_20 in Exclude<keyof I_1["translationConfig"], keyof TranslationConfig>]: never; }) | undefined;
    } & { [K_21 in Exclude<keyof I_1, keyof StreamingTranslateSpeechToSpeechConfig>]: never; }>(object: I_1): StreamingTranslateSpeechToSpeechConfig;
};
export declare const StreamingTranslateSpeechToSpeechRequest: {
    encode(message: StreamingTranslateSpeechToSpeechRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StreamingTranslateSpeechToSpeechRequest;
    fromJSON(object: any): StreamingTranslateSpeechToSpeechRequest;
    toJSON(message: StreamingTranslateSpeechToSpeechRequest): unknown;
    create<I extends {
        config?: {
            asrConfig?: {
                config?: {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } | undefined;
                interimResults?: boolean | undefined;
            } | undefined;
            ttsConfig?: {
                encoding?: AudioEncoding | undefined;
                sampleRateHz?: number | undefined;
                voiceName?: string | undefined;
                languageCode?: string | undefined;
                prosodyRate?: string | undefined;
                prosodyPitch?: string | undefined;
                prosodyVolume?: string | undefined;
            } | undefined;
            translationConfig?: {
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } | undefined;
        } | undefined;
        audioContent?: Uint8Array | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        config?: ({
            asrConfig?: {
                config?: {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } | undefined;
                interimResults?: boolean | undefined;
            } | undefined;
            ttsConfig?: {
                encoding?: AudioEncoding | undefined;
                sampleRateHz?: number | undefined;
                voiceName?: string | undefined;
                languageCode?: string | undefined;
                prosodyRate?: string | undefined;
                prosodyPitch?: string | undefined;
                prosodyVolume?: string | undefined;
            } | undefined;
            translationConfig?: {
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } | undefined;
        } & {
            asrConfig?: ({
                config?: {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } | undefined;
                interimResults?: boolean | undefined;
            } & {
                config?: ({
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } & {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: ({
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] & ({
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    } & {
                        phrases?: (string[] & string[] & { [K in Exclude<keyof I["config"]["asrConfig"]["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                        boost?: number | undefined;
                    } & { [K_1 in Exclude<keyof I["config"]["asrConfig"]["config"]["speechContexts"][number], keyof import("./riva_asr").SpeechContext>]: never; })[] & { [K_2 in Exclude<keyof I["config"]["asrConfig"]["config"]["speechContexts"], keyof {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[]>]: never; }) | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: ({
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } & {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } & { [K_3 in Exclude<keyof I["config"]["asrConfig"]["config"]["diarizationConfig"], keyof import("./riva_asr").SpeakerDiarizationConfig>]: never; }) | undefined;
                    customConfiguration?: ({
                        [x: string]: string | undefined;
                    } & {
                        [x: string]: string | undefined;
                    } & { [K_4 in Exclude<keyof I["config"]["asrConfig"]["config"]["customConfiguration"], string | number>]: never; }) | undefined;
                    endpointingConfig?: ({
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } & {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } & { [K_5 in Exclude<keyof I["config"]["asrConfig"]["config"]["endpointingConfig"], keyof import("./riva_asr").EndpointingConfig>]: never; }) | undefined;
                } & { [K_6 in Exclude<keyof I["config"]["asrConfig"]["config"], keyof import("./riva_asr").RecognitionConfig>]: never; }) | undefined;
                interimResults?: boolean | undefined;
            } & { [K_7 in Exclude<keyof I["config"]["asrConfig"], keyof StreamingRecognitionConfig>]: never; }) | undefined;
            ttsConfig?: ({
                encoding?: AudioEncoding | undefined;
                sampleRateHz?: number | undefined;
                voiceName?: string | undefined;
                languageCode?: string | undefined;
                prosodyRate?: string | undefined;
                prosodyPitch?: string | undefined;
                prosodyVolume?: string | undefined;
            } & {
                encoding?: AudioEncoding | undefined;
                sampleRateHz?: number | undefined;
                voiceName?: string | undefined;
                languageCode?: string | undefined;
                prosodyRate?: string | undefined;
                prosodyPitch?: string | undefined;
                prosodyVolume?: string | undefined;
            } & { [K_8 in Exclude<keyof I["config"]["ttsConfig"], keyof SynthesizeSpeechConfig>]: never; }) | undefined;
            translationConfig?: ({
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } & {
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } & { [K_9 in Exclude<keyof I["config"]["translationConfig"], keyof TranslationConfig>]: never; }) | undefined;
        } & { [K_10 in Exclude<keyof I["config"], keyof StreamingTranslateSpeechToSpeechConfig>]: never; }) | undefined;
        audioContent?: Uint8Array | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_11 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_12 in Exclude<keyof I, keyof StreamingTranslateSpeechToSpeechRequest>]: never; }>(base?: I): StreamingTranslateSpeechToSpeechRequest;
    fromPartial<I_1 extends {
        config?: {
            asrConfig?: {
                config?: {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } | undefined;
                interimResults?: boolean | undefined;
            } | undefined;
            ttsConfig?: {
                encoding?: AudioEncoding | undefined;
                sampleRateHz?: number | undefined;
                voiceName?: string | undefined;
                languageCode?: string | undefined;
                prosodyRate?: string | undefined;
                prosodyPitch?: string | undefined;
                prosodyVolume?: string | undefined;
            } | undefined;
            translationConfig?: {
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } | undefined;
        } | undefined;
        audioContent?: Uint8Array | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        config?: ({
            asrConfig?: {
                config?: {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } | undefined;
                interimResults?: boolean | undefined;
            } | undefined;
            ttsConfig?: {
                encoding?: AudioEncoding | undefined;
                sampleRateHz?: number | undefined;
                voiceName?: string | undefined;
                languageCode?: string | undefined;
                prosodyRate?: string | undefined;
                prosodyPitch?: string | undefined;
                prosodyVolume?: string | undefined;
            } | undefined;
            translationConfig?: {
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } | undefined;
        } & {
            asrConfig?: ({
                config?: {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } | undefined;
                interimResults?: boolean | undefined;
            } & {
                config?: ({
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } & {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: ({
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] & ({
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    } & {
                        phrases?: (string[] & string[] & { [K_13 in Exclude<keyof I_1["config"]["asrConfig"]["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                        boost?: number | undefined;
                    } & { [K_14 in Exclude<keyof I_1["config"]["asrConfig"]["config"]["speechContexts"][number], keyof import("./riva_asr").SpeechContext>]: never; })[] & { [K_15 in Exclude<keyof I_1["config"]["asrConfig"]["config"]["speechContexts"], keyof {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[]>]: never; }) | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: ({
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } & {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } & { [K_16 in Exclude<keyof I_1["config"]["asrConfig"]["config"]["diarizationConfig"], keyof import("./riva_asr").SpeakerDiarizationConfig>]: never; }) | undefined;
                    customConfiguration?: ({
                        [x: string]: string | undefined;
                    } & {
                        [x: string]: string | undefined;
                    } & { [K_17 in Exclude<keyof I_1["config"]["asrConfig"]["config"]["customConfiguration"], string | number>]: never; }) | undefined;
                    endpointingConfig?: ({
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } & {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } & { [K_18 in Exclude<keyof I_1["config"]["asrConfig"]["config"]["endpointingConfig"], keyof import("./riva_asr").EndpointingConfig>]: never; }) | undefined;
                } & { [K_19 in Exclude<keyof I_1["config"]["asrConfig"]["config"], keyof import("./riva_asr").RecognitionConfig>]: never; }) | undefined;
                interimResults?: boolean | undefined;
            } & { [K_20 in Exclude<keyof I_1["config"]["asrConfig"], keyof StreamingRecognitionConfig>]: never; }) | undefined;
            ttsConfig?: ({
                encoding?: AudioEncoding | undefined;
                sampleRateHz?: number | undefined;
                voiceName?: string | undefined;
                languageCode?: string | undefined;
                prosodyRate?: string | undefined;
                prosodyPitch?: string | undefined;
                prosodyVolume?: string | undefined;
            } & {
                encoding?: AudioEncoding | undefined;
                sampleRateHz?: number | undefined;
                voiceName?: string | undefined;
                languageCode?: string | undefined;
                prosodyRate?: string | undefined;
                prosodyPitch?: string | undefined;
                prosodyVolume?: string | undefined;
            } & { [K_21 in Exclude<keyof I_1["config"]["ttsConfig"], keyof SynthesizeSpeechConfig>]: never; }) | undefined;
            translationConfig?: ({
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } & {
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } & { [K_22 in Exclude<keyof I_1["config"]["translationConfig"], keyof TranslationConfig>]: never; }) | undefined;
        } & { [K_23 in Exclude<keyof I_1["config"], keyof StreamingTranslateSpeechToSpeechConfig>]: never; }) | undefined;
        audioContent?: Uint8Array | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_24 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_25 in Exclude<keyof I_1, keyof StreamingTranslateSpeechToSpeechRequest>]: never; }>(object: I_1): StreamingTranslateSpeechToSpeechRequest;
};
export declare const TranslationConfig: {
    encode(message: TranslationConfig, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TranslationConfig;
    fromJSON(object: any): TranslationConfig;
    toJSON(message: TranslationConfig): unknown;
    create<I extends {
        sourceLanguageCode?: string | undefined;
        targetLanguageCode?: string | undefined;
        modelName?: string | undefined;
    } & {
        sourceLanguageCode?: string | undefined;
        targetLanguageCode?: string | undefined;
        modelName?: string | undefined;
    } & { [K in Exclude<keyof I, keyof TranslationConfig>]: never; }>(base?: I): TranslationConfig;
    fromPartial<I_1 extends {
        sourceLanguageCode?: string | undefined;
        targetLanguageCode?: string | undefined;
        modelName?: string | undefined;
    } & {
        sourceLanguageCode?: string | undefined;
        targetLanguageCode?: string | undefined;
        modelName?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof TranslationConfig>]: never; }>(object: I_1): TranslationConfig;
};
export declare const SynthesizeSpeechConfig: {
    encode(message: SynthesizeSpeechConfig, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SynthesizeSpeechConfig;
    fromJSON(object: any): SynthesizeSpeechConfig;
    toJSON(message: SynthesizeSpeechConfig): unknown;
    create<I extends {
        encoding?: AudioEncoding | undefined;
        sampleRateHz?: number | undefined;
        voiceName?: string | undefined;
        languageCode?: string | undefined;
        prosodyRate?: string | undefined;
        prosodyPitch?: string | undefined;
        prosodyVolume?: string | undefined;
    } & {
        encoding?: AudioEncoding | undefined;
        sampleRateHz?: number | undefined;
        voiceName?: string | undefined;
        languageCode?: string | undefined;
        prosodyRate?: string | undefined;
        prosodyPitch?: string | undefined;
        prosodyVolume?: string | undefined;
    } & { [K in Exclude<keyof I, keyof SynthesizeSpeechConfig>]: never; }>(base?: I): SynthesizeSpeechConfig;
    fromPartial<I_1 extends {
        encoding?: AudioEncoding | undefined;
        sampleRateHz?: number | undefined;
        voiceName?: string | undefined;
        languageCode?: string | undefined;
        prosodyRate?: string | undefined;
        prosodyPitch?: string | undefined;
        prosodyVolume?: string | undefined;
    } & {
        encoding?: AudioEncoding | undefined;
        sampleRateHz?: number | undefined;
        voiceName?: string | undefined;
        languageCode?: string | undefined;
        prosodyRate?: string | undefined;
        prosodyPitch?: string | undefined;
        prosodyVolume?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SynthesizeSpeechConfig>]: never; }>(object: I_1): SynthesizeSpeechConfig;
};
export declare const StreamingTranslateSpeechToSpeechResponse: {
    encode(message: StreamingTranslateSpeechToSpeechResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StreamingTranslateSpeechToSpeechResponse;
    fromJSON(object: any): StreamingTranslateSpeechToSpeechResponse;
    toJSON(message: StreamingTranslateSpeechToSpeechResponse): unknown;
    create<I extends {
        speech?: {
            audio?: Uint8Array | undefined;
            meta?: {
                text?: string | undefined;
                processedText?: string | undefined;
                predictedDurations?: number[] | undefined;
            } | undefined;
            id?: {
                value?: string | undefined;
            } | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        speech?: ({
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
                predictedDurations?: (number[] & number[] & { [K in Exclude<keyof I["speech"]["meta"]["predictedDurations"], keyof number[]>]: never; }) | undefined;
            } & { [K_1 in Exclude<keyof I["speech"]["meta"], keyof import("./riva_tts").SynthesizeSpeechResponseMetadata>]: never; }) | undefined;
            id?: ({
                value?: string | undefined;
            } & {
                value?: string | undefined;
            } & { [K_2 in Exclude<keyof I["speech"]["id"], "value">]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["speech"], keyof SynthesizeSpeechResponse>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_4 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I, keyof StreamingTranslateSpeechToSpeechResponse>]: never; }>(base?: I): StreamingTranslateSpeechToSpeechResponse;
    fromPartial<I_1 extends {
        speech?: {
            audio?: Uint8Array | undefined;
            meta?: {
                text?: string | undefined;
                processedText?: string | undefined;
                predictedDurations?: number[] | undefined;
            } | undefined;
            id?: {
                value?: string | undefined;
            } | undefined;
        } | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        speech?: ({
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
                predictedDurations?: (number[] & number[] & { [K_6 in Exclude<keyof I_1["speech"]["meta"]["predictedDurations"], keyof number[]>]: never; }) | undefined;
            } & { [K_7 in Exclude<keyof I_1["speech"]["meta"], keyof import("./riva_tts").SynthesizeSpeechResponseMetadata>]: never; }) | undefined;
            id?: ({
                value?: string | undefined;
            } & {
                value?: string | undefined;
            } & { [K_8 in Exclude<keyof I_1["speech"]["id"], "value">]: never; }) | undefined;
        } & { [K_9 in Exclude<keyof I_1["speech"], keyof SynthesizeSpeechResponse>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_10 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_11 in Exclude<keyof I_1, keyof StreamingTranslateSpeechToSpeechResponse>]: never; }>(object: I_1): StreamingTranslateSpeechToSpeechResponse;
};
export declare const StreamingTranslateSpeechToTextRequest: {
    encode(message: StreamingTranslateSpeechToTextRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StreamingTranslateSpeechToTextRequest;
    fromJSON(object: any): StreamingTranslateSpeechToTextRequest;
    toJSON(message: StreamingTranslateSpeechToTextRequest): unknown;
    create<I extends {
        config?: {
            asrConfig?: {
                config?: {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } | undefined;
                interimResults?: boolean | undefined;
            } | undefined;
            translationConfig?: {
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } | undefined;
        } | undefined;
        audioContent?: Uint8Array | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        config?: ({
            asrConfig?: {
                config?: {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } | undefined;
                interimResults?: boolean | undefined;
            } | undefined;
            translationConfig?: {
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } | undefined;
        } & {
            asrConfig?: ({
                config?: {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } | undefined;
                interimResults?: boolean | undefined;
            } & {
                config?: ({
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } & {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: ({
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] & ({
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    } & {
                        phrases?: (string[] & string[] & { [K in Exclude<keyof I["config"]["asrConfig"]["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                        boost?: number | undefined;
                    } & { [K_1 in Exclude<keyof I["config"]["asrConfig"]["config"]["speechContexts"][number], keyof import("./riva_asr").SpeechContext>]: never; })[] & { [K_2 in Exclude<keyof I["config"]["asrConfig"]["config"]["speechContexts"], keyof {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[]>]: never; }) | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: ({
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } & {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } & { [K_3 in Exclude<keyof I["config"]["asrConfig"]["config"]["diarizationConfig"], keyof import("./riva_asr").SpeakerDiarizationConfig>]: never; }) | undefined;
                    customConfiguration?: ({
                        [x: string]: string | undefined;
                    } & {
                        [x: string]: string | undefined;
                    } & { [K_4 in Exclude<keyof I["config"]["asrConfig"]["config"]["customConfiguration"], string | number>]: never; }) | undefined;
                    endpointingConfig?: ({
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } & {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } & { [K_5 in Exclude<keyof I["config"]["asrConfig"]["config"]["endpointingConfig"], keyof import("./riva_asr").EndpointingConfig>]: never; }) | undefined;
                } & { [K_6 in Exclude<keyof I["config"]["asrConfig"]["config"], keyof import("./riva_asr").RecognitionConfig>]: never; }) | undefined;
                interimResults?: boolean | undefined;
            } & { [K_7 in Exclude<keyof I["config"]["asrConfig"], keyof StreamingRecognitionConfig>]: never; }) | undefined;
            translationConfig?: ({
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } & {
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } & { [K_8 in Exclude<keyof I["config"]["translationConfig"], keyof TranslationConfig>]: never; }) | undefined;
        } & { [K_9 in Exclude<keyof I["config"], keyof StreamingTranslateSpeechToTextConfig>]: never; }) | undefined;
        audioContent?: Uint8Array | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_10 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_11 in Exclude<keyof I, keyof StreamingTranslateSpeechToTextRequest>]: never; }>(base?: I): StreamingTranslateSpeechToTextRequest;
    fromPartial<I_1 extends {
        config?: {
            asrConfig?: {
                config?: {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } | undefined;
                interimResults?: boolean | undefined;
            } | undefined;
            translationConfig?: {
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } | undefined;
        } | undefined;
        audioContent?: Uint8Array | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        config?: ({
            asrConfig?: {
                config?: {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } | undefined;
                interimResults?: boolean | undefined;
            } | undefined;
            translationConfig?: {
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } | undefined;
        } & {
            asrConfig?: ({
                config?: {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } | undefined;
                interimResults?: boolean | undefined;
            } & {
                config?: ({
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } | undefined;
                    customConfiguration?: {
                        [x: string]: string | undefined;
                    } | undefined;
                    endpointingConfig?: {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } | undefined;
                } & {
                    encoding?: AudioEncoding | undefined;
                    sampleRateHertz?: number | undefined;
                    languageCode?: string | undefined;
                    maxAlternatives?: number | undefined;
                    profanityFilter?: boolean | undefined;
                    speechContexts?: ({
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[] & ({
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    } & {
                        phrases?: (string[] & string[] & { [K_12 in Exclude<keyof I_1["config"]["asrConfig"]["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                        boost?: number | undefined;
                    } & { [K_13 in Exclude<keyof I_1["config"]["asrConfig"]["config"]["speechContexts"][number], keyof import("./riva_asr").SpeechContext>]: never; })[] & { [K_14 in Exclude<keyof I_1["config"]["asrConfig"]["config"]["speechContexts"], keyof {
                        phrases?: string[] | undefined;
                        boost?: number | undefined;
                    }[]>]: never; }) | undefined;
                    audioChannelCount?: number | undefined;
                    enableWordTimeOffsets?: boolean | undefined;
                    enableAutomaticPunctuation?: boolean | undefined;
                    enableSeparateRecognitionPerChannel?: boolean | undefined;
                    model?: string | undefined;
                    verbatimTranscripts?: boolean | undefined;
                    diarizationConfig?: ({
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } & {
                        enableSpeakerDiarization?: boolean | undefined;
                        maxSpeakerCount?: number | undefined;
                    } & { [K_15 in Exclude<keyof I_1["config"]["asrConfig"]["config"]["diarizationConfig"], keyof import("./riva_asr").SpeakerDiarizationConfig>]: never; }) | undefined;
                    customConfiguration?: ({
                        [x: string]: string | undefined;
                    } & {
                        [x: string]: string | undefined;
                    } & { [K_16 in Exclude<keyof I_1["config"]["asrConfig"]["config"]["customConfiguration"], string | number>]: never; }) | undefined;
                    endpointingConfig?: ({
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } & {
                        startHistory?: number | undefined;
                        startThreshold?: number | undefined;
                        stopHistory?: number | undefined;
                        stopThreshold?: number | undefined;
                        stopHistoryEou?: number | undefined;
                        stopThresholdEou?: number | undefined;
                    } & { [K_17 in Exclude<keyof I_1["config"]["asrConfig"]["config"]["endpointingConfig"], keyof import("./riva_asr").EndpointingConfig>]: never; }) | undefined;
                } & { [K_18 in Exclude<keyof I_1["config"]["asrConfig"]["config"], keyof import("./riva_asr").RecognitionConfig>]: never; }) | undefined;
                interimResults?: boolean | undefined;
            } & { [K_19 in Exclude<keyof I_1["config"]["asrConfig"], keyof StreamingRecognitionConfig>]: never; }) | undefined;
            translationConfig?: ({
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } & {
                sourceLanguageCode?: string | undefined;
                targetLanguageCode?: string | undefined;
                modelName?: string | undefined;
            } & { [K_20 in Exclude<keyof I_1["config"]["translationConfig"], keyof TranslationConfig>]: never; }) | undefined;
        } & { [K_21 in Exclude<keyof I_1["config"], keyof StreamingTranslateSpeechToTextConfig>]: never; }) | undefined;
        audioContent?: Uint8Array | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_22 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_23 in Exclude<keyof I_1, keyof StreamingTranslateSpeechToTextRequest>]: never; }>(object: I_1): StreamingTranslateSpeechToTextRequest;
};
export declare const StreamingTranslateSpeechToTextResponse: {
    encode(message: StreamingTranslateSpeechToTextResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StreamingTranslateSpeechToTextResponse;
    fromJSON(object: any): StreamingTranslateSpeechToTextResponse;
    toJSON(message: StreamingTranslateSpeechToTextResponse): unknown;
    create<I extends {
        results?: {
            alternatives?: {
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            isFinal?: boolean | undefined;
            stability?: number | undefined;
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        }[] | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        results?: ({
            alternatives?: {
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            isFinal?: boolean | undefined;
            stability?: number | undefined;
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        }[] & ({
            alternatives?: {
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            isFinal?: boolean | undefined;
            stability?: number | undefined;
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        } & {
            alternatives?: ({
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            }[] & ({
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            } & {
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: ({
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] & ({
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                } & {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                } & { [K in Exclude<keyof I["results"][number]["alternatives"][number]["words"][number], keyof import("./riva_asr").WordInfo>]: never; })[] & { [K_1 in Exclude<keyof I["results"][number]["alternatives"][number]["words"], keyof {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["results"][number]["alternatives"][number], keyof import("./riva_asr").SpeechRecognitionAlternative>]: never; })[] & { [K_3 in Exclude<keyof I["results"][number]["alternatives"], keyof {
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
            isFinal?: boolean | undefined;
            stability?: number | undefined;
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        } & { [K_4 in Exclude<keyof I["results"][number], keyof StreamingRecognitionResult>]: never; })[] & { [K_5 in Exclude<keyof I["results"], keyof {
            alternatives?: {
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            isFinal?: boolean | undefined;
            stability?: number | undefined;
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        }[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_6 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, keyof StreamingTranslateSpeechToTextResponse>]: never; }>(base?: I): StreamingTranslateSpeechToTextResponse;
    fromPartial<I_1 extends {
        results?: {
            alternatives?: {
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            isFinal?: boolean | undefined;
            stability?: number | undefined;
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        }[] | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        results?: ({
            alternatives?: {
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            isFinal?: boolean | undefined;
            stability?: number | undefined;
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        }[] & ({
            alternatives?: {
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            isFinal?: boolean | undefined;
            stability?: number | undefined;
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        } & {
            alternatives?: ({
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            }[] & ({
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            } & {
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: ({
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] & ({
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                } & {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                } & { [K_8 in Exclude<keyof I_1["results"][number]["alternatives"][number]["words"][number], keyof import("./riva_asr").WordInfo>]: never; })[] & { [K_9 in Exclude<keyof I_1["results"][number]["alternatives"][number]["words"], keyof {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_10 in Exclude<keyof I_1["results"][number]["alternatives"][number], keyof import("./riva_asr").SpeechRecognitionAlternative>]: never; })[] & { [K_11 in Exclude<keyof I_1["results"][number]["alternatives"], keyof {
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            }[]>]: never; }) | undefined;
            isFinal?: boolean | undefined;
            stability?: number | undefined;
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        } & { [K_12 in Exclude<keyof I_1["results"][number], keyof StreamingRecognitionResult>]: never; })[] & { [K_13 in Exclude<keyof I_1["results"], keyof {
            alternatives?: {
                transcript?: string | undefined;
                confidence?: number | undefined;
                words?: {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[] | undefined;
            }[] | undefined;
            isFinal?: boolean | undefined;
            stability?: number | undefined;
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        }[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_14 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_15 in Exclude<keyof I_1, keyof StreamingTranslateSpeechToTextResponse>]: never; }>(object: I_1): StreamingTranslateSpeechToTextResponse;
};
export declare const StreamingTranslateSpeechToTextConfig: {
    encode(message: StreamingTranslateSpeechToTextConfig, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StreamingTranslateSpeechToTextConfig;
    fromJSON(object: any): StreamingTranslateSpeechToTextConfig;
    toJSON(message: StreamingTranslateSpeechToTextConfig): unknown;
    create<I extends {
        asrConfig?: {
            config?: {
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } | undefined;
                customConfiguration?: {
                    [x: string]: string | undefined;
                } | undefined;
                endpointingConfig?: {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } | undefined;
            } | undefined;
            interimResults?: boolean | undefined;
        } | undefined;
        translationConfig?: {
            sourceLanguageCode?: string | undefined;
            targetLanguageCode?: string | undefined;
            modelName?: string | undefined;
        } | undefined;
    } & {
        asrConfig?: ({
            config?: {
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } | undefined;
                customConfiguration?: {
                    [x: string]: string | undefined;
                } | undefined;
                endpointingConfig?: {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } | undefined;
            } | undefined;
            interimResults?: boolean | undefined;
        } & {
            config?: ({
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } | undefined;
                customConfiguration?: {
                    [x: string]: string | undefined;
                } | undefined;
                endpointingConfig?: {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } | undefined;
            } & {
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: ({
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] & ({
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                } & {
                    phrases?: (string[] & string[] & { [K in Exclude<keyof I["asrConfig"]["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                    boost?: number | undefined;
                } & { [K_1 in Exclude<keyof I["asrConfig"]["config"]["speechContexts"][number], keyof import("./riva_asr").SpeechContext>]: never; })[] & { [K_2 in Exclude<keyof I["asrConfig"]["config"]["speechContexts"], keyof {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[]>]: never; }) | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: ({
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } & {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } & { [K_3 in Exclude<keyof I["asrConfig"]["config"]["diarizationConfig"], keyof import("./riva_asr").SpeakerDiarizationConfig>]: never; }) | undefined;
                customConfiguration?: ({
                    [x: string]: string | undefined;
                } & {
                    [x: string]: string | undefined;
                } & { [K_4 in Exclude<keyof I["asrConfig"]["config"]["customConfiguration"], string | number>]: never; }) | undefined;
                endpointingConfig?: ({
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } & {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } & { [K_5 in Exclude<keyof I["asrConfig"]["config"]["endpointingConfig"], keyof import("./riva_asr").EndpointingConfig>]: never; }) | undefined;
            } & { [K_6 in Exclude<keyof I["asrConfig"]["config"], keyof import("./riva_asr").RecognitionConfig>]: never; }) | undefined;
            interimResults?: boolean | undefined;
        } & { [K_7 in Exclude<keyof I["asrConfig"], keyof StreamingRecognitionConfig>]: never; }) | undefined;
        translationConfig?: ({
            sourceLanguageCode?: string | undefined;
            targetLanguageCode?: string | undefined;
            modelName?: string | undefined;
        } & {
            sourceLanguageCode?: string | undefined;
            targetLanguageCode?: string | undefined;
            modelName?: string | undefined;
        } & { [K_8 in Exclude<keyof I["translationConfig"], keyof TranslationConfig>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I, keyof StreamingTranslateSpeechToTextConfig>]: never; }>(base?: I): StreamingTranslateSpeechToTextConfig;
    fromPartial<I_1 extends {
        asrConfig?: {
            config?: {
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } | undefined;
                customConfiguration?: {
                    [x: string]: string | undefined;
                } | undefined;
                endpointingConfig?: {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } | undefined;
            } | undefined;
            interimResults?: boolean | undefined;
        } | undefined;
        translationConfig?: {
            sourceLanguageCode?: string | undefined;
            targetLanguageCode?: string | undefined;
            modelName?: string | undefined;
        } | undefined;
    } & {
        asrConfig?: ({
            config?: {
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } | undefined;
                customConfiguration?: {
                    [x: string]: string | undefined;
                } | undefined;
                endpointingConfig?: {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } | undefined;
            } | undefined;
            interimResults?: boolean | undefined;
        } & {
            config?: ({
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } | undefined;
                customConfiguration?: {
                    [x: string]: string | undefined;
                } | undefined;
                endpointingConfig?: {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } | undefined;
            } & {
                encoding?: AudioEncoding | undefined;
                sampleRateHertz?: number | undefined;
                languageCode?: string | undefined;
                maxAlternatives?: number | undefined;
                profanityFilter?: boolean | undefined;
                speechContexts?: ({
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[] & ({
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                } & {
                    phrases?: (string[] & string[] & { [K_10 in Exclude<keyof I_1["asrConfig"]["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                    boost?: number | undefined;
                } & { [K_11 in Exclude<keyof I_1["asrConfig"]["config"]["speechContexts"][number], keyof import("./riva_asr").SpeechContext>]: never; })[] & { [K_12 in Exclude<keyof I_1["asrConfig"]["config"]["speechContexts"], keyof {
                    phrases?: string[] | undefined;
                    boost?: number | undefined;
                }[]>]: never; }) | undefined;
                audioChannelCount?: number | undefined;
                enableWordTimeOffsets?: boolean | undefined;
                enableAutomaticPunctuation?: boolean | undefined;
                enableSeparateRecognitionPerChannel?: boolean | undefined;
                model?: string | undefined;
                verbatimTranscripts?: boolean | undefined;
                diarizationConfig?: ({
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } & {
                    enableSpeakerDiarization?: boolean | undefined;
                    maxSpeakerCount?: number | undefined;
                } & { [K_13 in Exclude<keyof I_1["asrConfig"]["config"]["diarizationConfig"], keyof import("./riva_asr").SpeakerDiarizationConfig>]: never; }) | undefined;
                customConfiguration?: ({
                    [x: string]: string | undefined;
                } & {
                    [x: string]: string | undefined;
                } & { [K_14 in Exclude<keyof I_1["asrConfig"]["config"]["customConfiguration"], string | number>]: never; }) | undefined;
                endpointingConfig?: ({
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } & {
                    startHistory?: number | undefined;
                    startThreshold?: number | undefined;
                    stopHistory?: number | undefined;
                    stopThreshold?: number | undefined;
                    stopHistoryEou?: number | undefined;
                    stopThresholdEou?: number | undefined;
                } & { [K_15 in Exclude<keyof I_1["asrConfig"]["config"]["endpointingConfig"], keyof import("./riva_asr").EndpointingConfig>]: never; }) | undefined;
            } & { [K_16 in Exclude<keyof I_1["asrConfig"]["config"], keyof import("./riva_asr").RecognitionConfig>]: never; }) | undefined;
            interimResults?: boolean | undefined;
        } & { [K_17 in Exclude<keyof I_1["asrConfig"], keyof StreamingRecognitionConfig>]: never; }) | undefined;
        translationConfig?: ({
            sourceLanguageCode?: string | undefined;
            targetLanguageCode?: string | undefined;
            modelName?: string | undefined;
        } & {
            sourceLanguageCode?: string | undefined;
            targetLanguageCode?: string | undefined;
            modelName?: string | undefined;
        } & { [K_18 in Exclude<keyof I_1["translationConfig"], keyof TranslationConfig>]: never; }) | undefined;
    } & { [K_19 in Exclude<keyof I_1, keyof StreamingTranslateSpeechToTextConfig>]: never; }>(object: I_1): StreamingTranslateSpeechToTextConfig;
};
export declare const TranslateTextRequest: {
    encode(message: TranslateTextRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TranslateTextRequest;
    fromJSON(object: any): TranslateTextRequest;
    toJSON(message: TranslateTextRequest): unknown;
    create<I extends {
        texts?: string[] | undefined;
        model?: string | undefined;
        sourceLanguage?: string | undefined;
        targetLanguage?: string | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        texts?: (string[] & string[] & { [K in Exclude<keyof I["texts"], keyof string[]>]: never; }) | undefined;
        model?: string | undefined;
        sourceLanguage?: string | undefined;
        targetLanguage?: string | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_1 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof TranslateTextRequest>]: never; }>(base?: I): TranslateTextRequest;
    fromPartial<I_1 extends {
        texts?: string[] | undefined;
        model?: string | undefined;
        sourceLanguage?: string | undefined;
        targetLanguage?: string | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        texts?: (string[] & string[] & { [K_3 in Exclude<keyof I_1["texts"], keyof string[]>]: never; }) | undefined;
        model?: string | undefined;
        sourceLanguage?: string | undefined;
        targetLanguage?: string | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_4 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof TranslateTextRequest>]: never; }>(object: I_1): TranslateTextRequest;
};
export declare const Translation: {
    encode(message: Translation, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): Translation;
    fromJSON(object: any): Translation;
    toJSON(message: Translation): unknown;
    create<I extends {
        text?: string | undefined;
        language?: string | undefined;
    } & {
        text?: string | undefined;
        language?: string | undefined;
    } & { [K in Exclude<keyof I, keyof Translation>]: never; }>(base?: I): Translation;
    fromPartial<I_1 extends {
        text?: string | undefined;
        language?: string | undefined;
    } & {
        text?: string | undefined;
        language?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof Translation>]: never; }>(object: I_1): Translation;
};
export declare const TranslateTextResponse: {
    encode(message: TranslateTextResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): TranslateTextResponse;
    fromJSON(object: any): TranslateTextResponse;
    toJSON(message: TranslateTextResponse): unknown;
    create<I extends {
        translations?: {
            text?: string | undefined;
            language?: string | undefined;
        }[] | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        translations?: ({
            text?: string | undefined;
            language?: string | undefined;
        }[] & ({
            text?: string | undefined;
            language?: string | undefined;
        } & {
            text?: string | undefined;
            language?: string | undefined;
        } & { [K in Exclude<keyof I["translations"][number], keyof Translation>]: never; })[] & { [K_1 in Exclude<keyof I["translations"], keyof {
            text?: string | undefined;
            language?: string | undefined;
        }[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_2 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof TranslateTextResponse>]: never; }>(base?: I): TranslateTextResponse;
    fromPartial<I_1 extends {
        translations?: {
            text?: string | undefined;
            language?: string | undefined;
        }[] | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        translations?: ({
            text?: string | undefined;
            language?: string | undefined;
        }[] & ({
            text?: string | undefined;
            language?: string | undefined;
        } & {
            text?: string | undefined;
            language?: string | undefined;
        } & { [K_4 in Exclude<keyof I_1["translations"][number], keyof Translation>]: never; })[] & { [K_5 in Exclude<keyof I_1["translations"], keyof {
            text?: string | undefined;
            language?: string | undefined;
        }[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_6 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof TranslateTextResponse>]: never; }>(object: I_1): TranslateTextResponse;
};
export declare const AvailableLanguageRequest: {
    encode(message: AvailableLanguageRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AvailableLanguageRequest;
    fromJSON(object: any): AvailableLanguageRequest;
    toJSON(message: AvailableLanguageRequest): unknown;
    create<I extends {
        model?: string | undefined;
    } & {
        model?: string | undefined;
    } & { [K in Exclude<keyof I, "model">]: never; }>(base?: I): AvailableLanguageRequest;
    fromPartial<I_1 extends {
        model?: string | undefined;
    } & {
        model?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "model">]: never; }>(object: I_1): AvailableLanguageRequest;
};
export declare const AvailableLanguageResponse: {
    encode(message: AvailableLanguageResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AvailableLanguageResponse;
    fromJSON(object: any): AvailableLanguageResponse;
    toJSON(message: AvailableLanguageResponse): unknown;
    create<I extends {
        languages?: {
            [x: string]: {
                srcLang?: string[] | undefined;
                tgtLang?: string[] | undefined;
            } | undefined;
        } | undefined;
    } & {
        languages?: ({
            [x: string]: {
                srcLang?: string[] | undefined;
                tgtLang?: string[] | undefined;
            } | undefined;
        } & {
            [x: string]: ({
                srcLang?: string[] | undefined;
                tgtLang?: string[] | undefined;
            } & {
                srcLang?: (string[] & string[] & { [K in Exclude<keyof I["languages"][string]["srcLang"], keyof string[]>]: never; }) | undefined;
                tgtLang?: (string[] & string[] & { [K_1 in Exclude<keyof I["languages"][string]["tgtLang"], keyof string[]>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["languages"][string], keyof AvailableLanguageResponse_LanguagePair>]: never; }) | undefined;
        } & { [K_3 in Exclude<keyof I["languages"], string | number>]: never; }) | undefined;
    } & { [K_4 in Exclude<keyof I, "languages">]: never; }>(base?: I): AvailableLanguageResponse;
    fromPartial<I_1 extends {
        languages?: {
            [x: string]: {
                srcLang?: string[] | undefined;
                tgtLang?: string[] | undefined;
            } | undefined;
        } | undefined;
    } & {
        languages?: ({
            [x: string]: {
                srcLang?: string[] | undefined;
                tgtLang?: string[] | undefined;
            } | undefined;
        } & {
            [x: string]: ({
                srcLang?: string[] | undefined;
                tgtLang?: string[] | undefined;
            } & {
                srcLang?: (string[] & string[] & { [K_5 in Exclude<keyof I_1["languages"][string]["srcLang"], keyof string[]>]: never; }) | undefined;
                tgtLang?: (string[] & string[] & { [K_6 in Exclude<keyof I_1["languages"][string]["tgtLang"], keyof string[]>]: never; }) | undefined;
            } & { [K_7 in Exclude<keyof I_1["languages"][string], keyof AvailableLanguageResponse_LanguagePair>]: never; }) | undefined;
        } & { [K_8 in Exclude<keyof I_1["languages"], string | number>]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I_1, "languages">]: never; }>(object: I_1): AvailableLanguageResponse;
};
export declare const AvailableLanguageResponse_LanguagePair: {
    encode(message: AvailableLanguageResponse_LanguagePair, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AvailableLanguageResponse_LanguagePair;
    fromJSON(object: any): AvailableLanguageResponse_LanguagePair;
    toJSON(message: AvailableLanguageResponse_LanguagePair): unknown;
    create<I extends {
        srcLang?: string[] | undefined;
        tgtLang?: string[] | undefined;
    } & {
        srcLang?: (string[] & string[] & { [K in Exclude<keyof I["srcLang"], keyof string[]>]: never; }) | undefined;
        tgtLang?: (string[] & string[] & { [K_1 in Exclude<keyof I["tgtLang"], keyof string[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof AvailableLanguageResponse_LanguagePair>]: never; }>(base?: I): AvailableLanguageResponse_LanguagePair;
    fromPartial<I_1 extends {
        srcLang?: string[] | undefined;
        tgtLang?: string[] | undefined;
    } & {
        srcLang?: (string[] & string[] & { [K_3 in Exclude<keyof I_1["srcLang"], keyof string[]>]: never; }) | undefined;
        tgtLang?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["tgtLang"], keyof string[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof AvailableLanguageResponse_LanguagePair>]: never; }>(object: I_1): AvailableLanguageResponse_LanguagePair;
};
export declare const AvailableLanguageResponse_LanguagesEntry: {
    encode(message: AvailableLanguageResponse_LanguagesEntry, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): AvailableLanguageResponse_LanguagesEntry;
    fromJSON(object: any): AvailableLanguageResponse_LanguagesEntry;
    toJSON(message: AvailableLanguageResponse_LanguagesEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: {
            srcLang?: string[] | undefined;
            tgtLang?: string[] | undefined;
        } | undefined;
    } & {
        key?: string | undefined;
        value?: ({
            srcLang?: string[] | undefined;
            tgtLang?: string[] | undefined;
        } & {
            srcLang?: (string[] & string[] & { [K in Exclude<keyof I["value"]["srcLang"], keyof string[]>]: never; }) | undefined;
            tgtLang?: (string[] & string[] & { [K_1 in Exclude<keyof I["value"]["tgtLang"], keyof string[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["value"], keyof AvailableLanguageResponse_LanguagePair>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, keyof AvailableLanguageResponse_LanguagesEntry>]: never; }>(base?: I): AvailableLanguageResponse_LanguagesEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: {
            srcLang?: string[] | undefined;
            tgtLang?: string[] | undefined;
        } | undefined;
    } & {
        key?: string | undefined;
        value?: ({
            srcLang?: string[] | undefined;
            tgtLang?: string[] | undefined;
        } & {
            srcLang?: (string[] & string[] & { [K_4 in Exclude<keyof I_1["value"]["srcLang"], keyof string[]>]: never; }) | undefined;
            tgtLang?: (string[] & string[] & { [K_5 in Exclude<keyof I_1["value"]["tgtLang"], keyof string[]>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I_1["value"], keyof AvailableLanguageResponse_LanguagePair>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, keyof AvailableLanguageResponse_LanguagesEntry>]: never; }>(object: I_1): AvailableLanguageResponse_LanguagesEntry;
};
/** RivaTranslation service provides rpcs to translate between languages. */
export type RivaTranslationService = typeof RivaTranslationService;
export declare const RivaTranslationService: {
    /**
     * Translate text to text, from a source to a target language.  Currently
     * source and target language fields is required, along with the model name.
     * Multiple texts may be passed per request up to the given batch size for the
     * model, which is set at translation pipeline creation time.
     */
    readonly translateText: {
        readonly path: "/nvidia.riva.nmt.RivaTranslation/TranslateText";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: TranslateTextRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => TranslateTextRequest;
        readonly responseSerialize: (value: TranslateTextResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => TranslateTextResponse;
    };
    /**
     * Lists the available language pairs and models names to be used for
     * TranslateText
     */
    readonly listSupportedLanguagePairs: {
        readonly path: "/nvidia.riva.nmt.RivaTranslation/ListSupportedLanguagePairs";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: AvailableLanguageRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => AvailableLanguageRequest;
        readonly responseSerialize: (value: AvailableLanguageResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => AvailableLanguageResponse;
    };
    /** streaming speech to text translation api. */
    readonly streamingTranslateSpeechToText: {
        readonly path: "/nvidia.riva.nmt.RivaTranslation/StreamingTranslateSpeechToText";
        readonly requestStream: true;
        readonly responseStream: true;
        readonly requestSerialize: (value: StreamingTranslateSpeechToTextRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => StreamingTranslateSpeechToTextRequest;
        readonly responseSerialize: (value: StreamingTranslateSpeechToTextResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => StreamingTranslateSpeechToTextResponse;
    };
    readonly streamingTranslateSpeechToSpeech: {
        readonly path: "/nvidia.riva.nmt.RivaTranslation/StreamingTranslateSpeechToSpeech";
        readonly requestStream: true;
        readonly responseStream: true;
        readonly requestSerialize: (value: StreamingTranslateSpeechToSpeechRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => StreamingTranslateSpeechToSpeechRequest;
        readonly responseSerialize: (value: StreamingTranslateSpeechToSpeechResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => StreamingTranslateSpeechToSpeechResponse;
    };
};
export interface RivaTranslationServer extends UntypedServiceImplementation {
    /**
     * Translate text to text, from a source to a target language.  Currently
     * source and target language fields is required, along with the model name.
     * Multiple texts may be passed per request up to the given batch size for the
     * model, which is set at translation pipeline creation time.
     */
    translateText: handleUnaryCall<TranslateTextRequest, TranslateTextResponse>;
    /**
     * Lists the available language pairs and models names to be used for
     * TranslateText
     */
    listSupportedLanguagePairs: handleUnaryCall<AvailableLanguageRequest, AvailableLanguageResponse>;
    /** streaming speech to text translation api. */
    streamingTranslateSpeechToText: handleBidiStreamingCall<StreamingTranslateSpeechToTextRequest, StreamingTranslateSpeechToTextResponse>;
    streamingTranslateSpeechToSpeech: handleBidiStreamingCall<StreamingTranslateSpeechToSpeechRequest, StreamingTranslateSpeechToSpeechResponse>;
}
export interface RivaTranslationClient extends Client {
    /**
     * Translate text to text, from a source to a target language.  Currently
     * source and target language fields is required, along with the model name.
     * Multiple texts may be passed per request up to the given batch size for the
     * model, which is set at translation pipeline creation time.
     */
    translateText(request: TranslateTextRequest, callback: (error: ServiceError | null, response: TranslateTextResponse) => void): ClientUnaryCall;
    translateText(request: TranslateTextRequest, metadata: Metadata, callback: (error: ServiceError | null, response: TranslateTextResponse) => void): ClientUnaryCall;
    translateText(request: TranslateTextRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: TranslateTextResponse) => void): ClientUnaryCall;
    /**
     * Lists the available language pairs and models names to be used for
     * TranslateText
     */
    listSupportedLanguagePairs(request: AvailableLanguageRequest, callback: (error: ServiceError | null, response: AvailableLanguageResponse) => void): ClientUnaryCall;
    listSupportedLanguagePairs(request: AvailableLanguageRequest, metadata: Metadata, callback: (error: ServiceError | null, response: AvailableLanguageResponse) => void): ClientUnaryCall;
    listSupportedLanguagePairs(request: AvailableLanguageRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: AvailableLanguageResponse) => void): ClientUnaryCall;
    /** streaming speech to text translation api. */
    streamingTranslateSpeechToText(): ClientDuplexStream<StreamingTranslateSpeechToTextRequest, StreamingTranslateSpeechToTextResponse>;
    streamingTranslateSpeechToText(options: Partial<CallOptions>): ClientDuplexStream<StreamingTranslateSpeechToTextRequest, StreamingTranslateSpeechToTextResponse>;
    streamingTranslateSpeechToText(metadata: Metadata, options?: Partial<CallOptions>): ClientDuplexStream<StreamingTranslateSpeechToTextRequest, StreamingTranslateSpeechToTextResponse>;
    streamingTranslateSpeechToSpeech(): ClientDuplexStream<StreamingTranslateSpeechToSpeechRequest, StreamingTranslateSpeechToSpeechResponse>;
    streamingTranslateSpeechToSpeech(options: Partial<CallOptions>): ClientDuplexStream<StreamingTranslateSpeechToSpeechRequest, StreamingTranslateSpeechToSpeechResponse>;
    streamingTranslateSpeechToSpeech(metadata: Metadata, options?: Partial<CallOptions>): ClientDuplexStream<StreamingTranslateSpeechToSpeechRequest, StreamingTranslateSpeechToSpeechResponse>;
}
export declare const RivaTranslationClient: {
    new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): RivaTranslationClient;
    service: typeof RivaTranslationService;
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
