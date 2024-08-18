/// <reference types="node" />
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { type CallOptions, ChannelCredentials, Client, ClientDuplexStream, type ClientOptions, type ClientUnaryCall, handleBidiStreamingCall, type handleUnaryCall, Metadata, type ServiceError, type UntypedServiceImplementation } from "@grpc/grpc-js";
import { AudioEncoding } from "./riva_audio";
import { RequestId } from "./riva_common";
export declare const protobufPackage = "nvidia.riva.asr";
export interface RivaSpeechRecognitionConfigRequest {
    /**
     * If model is specified only return config for model, otherwise return all
     * configs.
     */
    modelName: string;
}
export interface RivaSpeechRecognitionConfigResponse {
    modelConfig: RivaSpeechRecognitionConfigResponse_Config[];
}
export interface RivaSpeechRecognitionConfigResponse_Config {
    modelName: string;
    parameters: {
        [key: string]: string;
    };
}
export interface RivaSpeechRecognitionConfigResponse_Config_ParametersEntry {
    key: string;
    value: string;
}
/** RecognizeRequest is used for batch processing of a single audio recording. */
export interface RecognizeRequest {
    /**
     * Provides information to recognizer that specifies how to process the
     * request.
     */
    config: RecognitionConfig | undefined;
    /**
     * The raw audio data to be processed. The audio bytes must be encoded as
     * specified in `RecognitionConfig`.
     */
    audio: Uint8Array;
    /**
     * The ID to be associated with the request. If provided, this will be
     * returned in the corresponding response.
     */
    id: RequestId | undefined;
}
/**
 * A StreamingRecognizeRequest is used to configure and stream audio content to
 * the Riva ASR Service. The first message sent must include only a
 * StreamingRecognitionConfig. Subsequent messages sent in the stream must
 * contain only raw bytes of the audio to be recognized.
 */
export interface StreamingRecognizeRequest {
    /**
     * Provides information to the recognizer that specifies how to process the
     * request. The first `StreamingRecognizeRequest` message must contain a
     * `streaming_config`  message.
     */
    streamingConfig?: StreamingRecognitionConfig | undefined;
    /**
     * The audio data to be recognized. Sequential chunks of audio data are sent
     * in sequential `StreamingRecognizeRequest` messages. The first
     * `StreamingRecognizeRequest` message must not contain `audio` data
     * and all subsequent `StreamingRecognizeRequest` messages must contain
     * `audio` data. The audio bytes must be encoded as specified in
     * `RecognitionConfig`.
     */
    audioContent?: Uint8Array | undefined;
    /**
     * The ID to be associated with the request. If provided, this will be
     * returned in the corresponding responses.
     */
    id: RequestId | undefined;
}
/**
 * EndpointingConfig is used for configuring different fields related to start
 * or end of utterance
 */
export interface EndpointingConfig {
    /**
     * `start_history` is the size of the window, in milliseconds, used to
     * detect start of utterance.
     * `start_threshold` is the percentage threshold used to detect start of
     * utterance. (0.0 to 1.0)
     * If `start_threshold` of `start_history` ms of the acoustic model output
     * have non-blank tokens, start of utterance is detected.
     */
    startHistory?: number | undefined;
    startThreshold?: number | undefined;
    /**
     * `stop_history` is the size of the window, in milliseconds, used to
     * detect end of utterance.
     * `stop_threshold` is the percentage threshold used to detect end of
     * utterance. (0.0 to 1.0)
     * If `stop_threshold` of `stop_history` ms of the acoustic model output have
     * non-blank tokens, end of utterance is detected and decoder will be reset.
     */
    stopHistory?: number | undefined;
    stopThreshold?: number | undefined;
    /**
     * `stop_history_eou` and `stop_threshold_eou` are used for 2-pass end of utterance.
     * `stop_history_eou` is the size of the window, in milliseconds, used to
     * trigger 1st pass of end of utterance and generate a partial transcript
     * with stability of 1. (stop_history_eou < stop_history)
     * `stop_threshold_eou` is the percentage threshold used to trigger 1st
     * pass of end of utterance. (0.0 to 1.0)
     * If `stop_threshold_eou` of `stop_history_eou` ms of the acoustic model
     * output have non-blank tokens, 1st pass of end of utterance is triggered.
     */
    stopHistoryEou?: number | undefined;
    stopThresholdEou?: number | undefined;
}
/**
 * Provides information to the recognizer that specifies how to process the
 * request
 */
export interface RecognitionConfig {
    /**
     * The encoding of the audio data sent in the request.
     *
     * All encodings support only 1 channel (mono) audio.
     */
    encoding: AudioEncoding;
    /**
     * The sample rate in hertz (Hz) of the audio data sent in the
     * `RecognizeRequest` or `StreamingRecognizeRequest` messages.
     *  The Riva server will automatically down-sample/up-sample the audio to
     *  match the ASR acoustic model sample rate. The sample rate value below 8kHz
     *  will not produce any meaningful output.
     */
    sampleRateHertz: number;
    /**
     * Required. The language of the supplied audio as a
     * [BCP-47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt) language tag.
     * Example: "en-US".
     */
    languageCode: string;
    /**
     * Maximum number of recognition hypotheses to be returned.
     * Specifically, the maximum number of `SpeechRecognizeAlternative` messages
     * within each `SpeechRecognizeResult`.
     * The server may return fewer than `max_alternatives`.
     * If omitted, will return a maximum of one.
     */
    maxAlternatives: number;
    /**
     * A custom field that enables profanity filtering for the generated
     * transcripts. If set to 'true', the server filters out profanities,
     * replacing all but the initial character in each filtered word with
     * asterisks. For example, "x**". If set to `false` or omitted, profanities
     * will not be filtered out. The default is `false`.
     */
    profanityFilter: boolean;
    /**
     * Array of SpeechContext.
     * A means to provide context to assist the speech recognition. For more
     * information, see SpeechContext section
     */
    speechContexts: SpeechContext[];
    /**
     * The number of channels in the input audio data.
     * If `0` or omitted, defaults to one channel (mono).
     * Note: Only single channel audio input is supported as of now.
     */
    audioChannelCount: number;
    /**
     * If `true`, the top result includes a list of words and the start and end
     * time offsets (timestamps), and confidence scores for those words. If
     * `false`, no word-level time offset information is returned. The default
     * is `false`.
     */
    enableWordTimeOffsets: boolean;
    /**
     * If 'true', adds punctuation to recognition result hypotheses. The
     * default 'false' value does not add punctuation to result hypotheses.
     */
    enableAutomaticPunctuation: boolean;
    /**
     * This needs to be set to `true` explicitly and `audio_channel_count` > 1
     * to get each channel recognized separately. The recognition result will
     * contain a `channel_tag` field to state which channel that result belongs
     * to. If this is not true, we will only recognize the first channel. The
     * request is billed cumulatively for all channels recognized:
     * `audio_channel_count` multiplied by the length of the audio.
     * Note: This field is not yet supported.
     */
    enableSeparateRecognitionPerChannel: boolean;
    /**
     * Which model to select for the given request.
     * If empty, Riva will select the right model based on the other
     * RecognitionConfig parameters. The model should correspond to the name
     * passed to `riva-build` with the `--name` argument
     */
    model: string;
    /**
     * The verbatim_transcripts flag enables or disable inverse text
     * normalization. 'true' returns exactly what was said, with no
     * denormalization. 'false' applies inverse text normalization, also this is
     * the default
     */
    verbatimTranscripts: boolean;
    /**
     * Config to enable speaker diarization and set additional
     * parameters. For non-streaming requests, the diarization results will be
     * provided only in the top alternative of the FINAL SpeechRecognitionResult.
     */
    diarizationConfig: SpeakerDiarizationConfig | undefined;
    /**
     * Custom fields for passing request-level
     * configuration options to plugins used in the
     * model pipeline.
     */
    customConfiguration: {
        [key: string]: string;
    };
    /**
     * Config for tuning start or end of utterance parameters.
     * If empty, Riva will use default values or custom values if specified in riva-build arguments.
     */
    endpointingConfig?: EndpointingConfig | undefined;
}
export interface RecognitionConfig_CustomConfigurationEntry {
    key: string;
    value: string;
}
/**
 * Provides information to the recognizer that specifies how to process the
 * request
 */
export interface StreamingRecognitionConfig {
    /**
     * Provides information to the recognizer that specifies how to process the
     * request
     */
    config: RecognitionConfig | undefined;
    /**
     * If `true`, interim results (tentative hypotheses) may be
     * returned as they become available (these interim results are indicated with
     * the `is_final=false` flag).
     * If `false` or omitted, only `is_final=true` result(s) are returned.
     */
    interimResults: boolean;
}
/** Config to enable speaker diarization. */
export interface SpeakerDiarizationConfig {
    /**
     * If 'true', enables speaker detection for each recognized word in
     * the top alternative of the recognition result using a speaker_tag provided
     * in the WordInfo.
     */
    enableSpeakerDiarization: boolean;
    /**
     * Maximum number of speakers in the conversation. This gives flexibility by
     * allowing the system to automatically determine the correct number of
     * speakers. If not set, the default value is 8.
     */
    maxSpeakerCount: number;
}
/**
 * Provides "hints" to the speech recognizer to favor specific words and phrases
 * in the results.
 */
export interface SpeechContext {
    /**
     * A list of strings containing words and phrases "hints" so that
     * the speech recognition is more likely to recognize them. This can be used
     * to improve the accuracy for specific words and phrases, for example, if
     * specific commands are typically spoken by the user. This can also be used
     * to add additional words to the vocabulary of the recognizer.
     */
    phrases: string[];
    /**
     * Hint Boost. Positive value will increase the probability that a specific
     * phrase will be recognized over other similar sounding phrases. The higher
     * the boost, the higher the chance of false positive recognition as well.
     * Though `boost` can accept a wide range of positive values, most use cases
     * are best served with values between 0 and 20. We recommend using a binary
     * search approach to finding the optimal value for your use case.
     */
    boost: number;
}
/**
 * The only message returned to the client by the `Recognize` method. It
 * contains the result as zero or more sequential `SpeechRecognitionResult`
 * messages.
 */
export interface RecognizeResponse {
    /**
     * Sequential list of transcription results corresponding to
     * sequential portions of audio. Currently only returns one transcript.
     */
    results: SpeechRecognitionResult[];
    /** The ID associated with the request */
    id: RequestId | undefined;
}
/** A speech recognition result corresponding to the latest transcript */
export interface SpeechRecognitionResult {
    /**
     * May contain one or more recognition hypotheses (up to the
     * maximum specified in `max_alternatives`).
     * These alternatives are ordered in terms of accuracy, with the top (first)
     * alternative being the most probable, as ranked by the recognizer.
     */
    alternatives: SpeechRecognitionAlternative[];
    /**
     * For multi-channel audio, this is the channel number corresponding to the
     * recognized result for the audio from that channel.
     * For audio_channel_count = N, its output values can range from '1' to 'N'.
     */
    channelTag: number;
    /** Length of audio processed so far in seconds */
    audioProcessed: number;
}
/** Alternative hypotheses (a.k.a. n-best list). */
export interface SpeechRecognitionAlternative {
    /** Transcript text representing the words that the user spoke. */
    transcript: string;
    /**
     * The confidence estimate. A higher number indicates an estimated greater
     * likelihood that the recognized word is correct. This field is set only for
     * a non-streaming result or, for a streaming result where is_final=true.
     * This field is not guaranteed to be accurate and users should not rely on
     * it to be always provided. Although confidence can currently be roughly
     * interpreted as a natural-log probability, the estimate computation varies
     * with difference configurations, and is subject to change. The default of
     * 0.0 is a sentinel value indicating confidence was not set.
     */
    confidence: number;
    /**
     * A list of word-specific information for each recognized word. Only
     * populated if is_final=true
     */
    words: WordInfo[];
}
/** Word-specific information for recognized words. */
export interface WordInfo {
    /**
     * Time offset relative to the beginning of the audio in ms
     * and corresponding to the start of the spoken word.
     * This field is only set if `enable_word_time_offsets=true` and only
     * in the top hypothesis.
     */
    startTime: number;
    /**
     * Time offset relative to the beginning of the audio in ms
     * and corresponding to the end of the spoken word.
     * This field is only set if `enable_word_time_offsets=true` and only
     * in the top hypothesis.
     */
    endTime: number;
    /** The word corresponding to this set of information. */
    word: string;
    /**
     * The confidence estimate. A higher number indicates an estimated greater
     * likelihood that the recognized word is correct. This field is set only for
     * a non-streaming result or, for a streaming result where is_final=true.
     * This field is not guaranteed to be accurate and users should not rely on
     * it to be always provided. Although confidence can currently be roughly
     * interpreted as a natural-log probability, the estimate computation varies
     * with difference configurations, and is subject to change. The default of
     * 0.0 is a sentinel value indicating confidence was not set.
     */
    confidence: number;
    /**
     * Output only. A distinct integer value is assigned for every speaker within
     * the audio. This field specifies which one of those speakers was detected to
     * have spoken this word. Value ranges from '1' to diarization_speaker_count.
     * speaker_tag is set if enable_speaker_diarization = 'true' and only in the
     * top alternative.
     */
    speakerTag: number;
}
export interface StreamingRecognizeResponse {
    /**
     * This repeated list contains the latest transcript(s) corresponding to
     * audio currently being processed.
     * Currently one result is returned, where each result can have multiple
     * alternatives
     */
    results: StreamingRecognitionResult[];
    /** The ID associated with the request */
    id: RequestId | undefined;
}
/**
 * A streaming speech recognition result corresponding to a portion of the audio
 * that is currently being processed.
 */
export interface StreamingRecognitionResult {
    /**
     * May contain one or more recognition hypotheses (up to the
     * maximum specified in `max_alternatives`).
     * These alternatives are ordered in terms of accuracy, with the top (first)
     * alternative being the most probable, as ranked by the recognizer.
     */
    alternatives: SpeechRecognitionAlternative[];
    /**
     * If `false`, this `StreamingRecognitionResult` represents an
     * interim result that may change. If `true`, this is the final time the
     * speech service will return this particular `StreamingRecognitionResult`,
     * the recognizer will not return any further hypotheses for this portion of
     * the transcript and corresponding audio.
     */
    isFinal: boolean;
    /**
     * An estimate of the likelihood that the recognizer will not
     * change its guess about this interim result. Values range from 0.0
     * (completely unstable) to 1.0 (completely stable).
     * This field is only provided for interim results (`is_final=false`).
     * The default of 0.0 is a sentinel value indicating `stability` was not set.
     */
    stability: number;
    /**
     * For multi-channel audio, this is the channel number corresponding to the
     * recognized result for the audio from that channel.
     * For audio_channel_count = N, its output values can range from '1' to 'N'.
     */
    channelTag: number;
    /** Length of audio processed so far in seconds */
    audioProcessed: number;
}
export declare const RivaSpeechRecognitionConfigRequest: {
    encode(message: RivaSpeechRecognitionConfigRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RivaSpeechRecognitionConfigRequest;
    fromJSON(object: any): RivaSpeechRecognitionConfigRequest;
    toJSON(message: RivaSpeechRecognitionConfigRequest): unknown;
    create<I extends {
        modelName?: string | undefined;
    } & {
        modelName?: string | undefined;
    } & { [K in Exclude<keyof I, "modelName">]: never; }>(base?: I): RivaSpeechRecognitionConfigRequest;
    fromPartial<I_1 extends {
        modelName?: string | undefined;
    } & {
        modelName?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, "modelName">]: never; }>(object: I_1): RivaSpeechRecognitionConfigRequest;
};
export declare const RivaSpeechRecognitionConfigResponse: {
    encode(message: RivaSpeechRecognitionConfigResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RivaSpeechRecognitionConfigResponse;
    fromJSON(object: any): RivaSpeechRecognitionConfigResponse;
    toJSON(message: RivaSpeechRecognitionConfigResponse): unknown;
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
        } & { [K_1 in Exclude<keyof I["modelConfig"][number], keyof RivaSpeechRecognitionConfigResponse_Config>]: never; })[] & { [K_2 in Exclude<keyof I["modelConfig"], keyof {
            modelName?: string | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_3 in Exclude<keyof I, "modelConfig">]: never; }>(base?: I): RivaSpeechRecognitionConfigResponse;
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
        } & { [K_5 in Exclude<keyof I_1["modelConfig"][number], keyof RivaSpeechRecognitionConfigResponse_Config>]: never; })[] & { [K_6 in Exclude<keyof I_1["modelConfig"], keyof {
            modelName?: string | undefined;
            parameters?: {
                [x: string]: string | undefined;
            } | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I_1, "modelConfig">]: never; }>(object: I_1): RivaSpeechRecognitionConfigResponse;
};
export declare const RivaSpeechRecognitionConfigResponse_Config: {
    encode(message: RivaSpeechRecognitionConfigResponse_Config, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RivaSpeechRecognitionConfigResponse_Config;
    fromJSON(object: any): RivaSpeechRecognitionConfigResponse_Config;
    toJSON(message: RivaSpeechRecognitionConfigResponse_Config): unknown;
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
    } & { [K_1 in Exclude<keyof I, keyof RivaSpeechRecognitionConfigResponse_Config>]: never; }>(base?: I): RivaSpeechRecognitionConfigResponse_Config;
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
    } & { [K_3 in Exclude<keyof I_1, keyof RivaSpeechRecognitionConfigResponse_Config>]: never; }>(object: I_1): RivaSpeechRecognitionConfigResponse_Config;
};
export declare const RivaSpeechRecognitionConfigResponse_Config_ParametersEntry: {
    encode(message: RivaSpeechRecognitionConfigResponse_Config_ParametersEntry, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RivaSpeechRecognitionConfigResponse_Config_ParametersEntry;
    fromJSON(object: any): RivaSpeechRecognitionConfigResponse_Config_ParametersEntry;
    toJSON(message: RivaSpeechRecognitionConfigResponse_Config_ParametersEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof RivaSpeechRecognitionConfigResponse_Config_ParametersEntry>]: never; }>(base?: I): RivaSpeechRecognitionConfigResponse_Config_ParametersEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof RivaSpeechRecognitionConfigResponse_Config_ParametersEntry>]: never; }>(object: I_1): RivaSpeechRecognitionConfigResponse_Config_ParametersEntry;
};
export declare const RecognizeRequest: {
    encode(message: RecognizeRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RecognizeRequest;
    fromJSON(object: any): RecognizeRequest;
    toJSON(message: RecognizeRequest): unknown;
    create<I extends {
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
        audio?: Uint8Array | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
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
                phrases?: (string[] & string[] & { [K in Exclude<keyof I["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                boost?: number | undefined;
            } & { [K_1 in Exclude<keyof I["config"]["speechContexts"][number], keyof SpeechContext>]: never; })[] & { [K_2 in Exclude<keyof I["config"]["speechContexts"], keyof {
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
            } & { [K_3 in Exclude<keyof I["config"]["diarizationConfig"], keyof SpeakerDiarizationConfig>]: never; }) | undefined;
            customConfiguration?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_4 in Exclude<keyof I["config"]["customConfiguration"], string | number>]: never; }) | undefined;
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
            } & { [K_5 in Exclude<keyof I["config"]["endpointingConfig"], keyof EndpointingConfig>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["config"], keyof RecognitionConfig>]: never; }) | undefined;
        audio?: Uint8Array | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_7 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_8 in Exclude<keyof I, keyof RecognizeRequest>]: never; }>(base?: I): RecognizeRequest;
    fromPartial<I_1 extends {
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
        audio?: Uint8Array | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
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
                phrases?: (string[] & string[] & { [K_9 in Exclude<keyof I_1["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                boost?: number | undefined;
            } & { [K_10 in Exclude<keyof I_1["config"]["speechContexts"][number], keyof SpeechContext>]: never; })[] & { [K_11 in Exclude<keyof I_1["config"]["speechContexts"], keyof {
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
            } & { [K_12 in Exclude<keyof I_1["config"]["diarizationConfig"], keyof SpeakerDiarizationConfig>]: never; }) | undefined;
            customConfiguration?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_13 in Exclude<keyof I_1["config"]["customConfiguration"], string | number>]: never; }) | undefined;
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
            } & { [K_14 in Exclude<keyof I_1["config"]["endpointingConfig"], keyof EndpointingConfig>]: never; }) | undefined;
        } & { [K_15 in Exclude<keyof I_1["config"], keyof RecognitionConfig>]: never; }) | undefined;
        audio?: Uint8Array | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_16 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_17 in Exclude<keyof I_1, keyof RecognizeRequest>]: never; }>(object: I_1): RecognizeRequest;
};
export declare const StreamingRecognizeRequest: {
    encode(message: StreamingRecognizeRequest, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StreamingRecognizeRequest;
    fromJSON(object: any): StreamingRecognizeRequest;
    toJSON(message: StreamingRecognizeRequest): unknown;
    create<I extends {
        streamingConfig?: {
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
        audioContent?: Uint8Array | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        streamingConfig?: ({
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
                    phrases?: (string[] & string[] & { [K in Exclude<keyof I["streamingConfig"]["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                    boost?: number | undefined;
                } & { [K_1 in Exclude<keyof I["streamingConfig"]["config"]["speechContexts"][number], keyof SpeechContext>]: never; })[] & { [K_2 in Exclude<keyof I["streamingConfig"]["config"]["speechContexts"], keyof {
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
                } & { [K_3 in Exclude<keyof I["streamingConfig"]["config"]["diarizationConfig"], keyof SpeakerDiarizationConfig>]: never; }) | undefined;
                customConfiguration?: ({
                    [x: string]: string | undefined;
                } & {
                    [x: string]: string | undefined;
                } & { [K_4 in Exclude<keyof I["streamingConfig"]["config"]["customConfiguration"], string | number>]: never; }) | undefined;
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
                } & { [K_5 in Exclude<keyof I["streamingConfig"]["config"]["endpointingConfig"], keyof EndpointingConfig>]: never; }) | undefined;
            } & { [K_6 in Exclude<keyof I["streamingConfig"]["config"], keyof RecognitionConfig>]: never; }) | undefined;
            interimResults?: boolean | undefined;
        } & { [K_7 in Exclude<keyof I["streamingConfig"], keyof StreamingRecognitionConfig>]: never; }) | undefined;
        audioContent?: Uint8Array | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_8 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_9 in Exclude<keyof I, keyof StreamingRecognizeRequest>]: never; }>(base?: I): StreamingRecognizeRequest;
    fromPartial<I_1 extends {
        streamingConfig?: {
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
        audioContent?: Uint8Array | undefined;
        id?: {
            value?: string | undefined;
        } | undefined;
    } & {
        streamingConfig?: ({
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
                    phrases?: (string[] & string[] & { [K_10 in Exclude<keyof I_1["streamingConfig"]["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                    boost?: number | undefined;
                } & { [K_11 in Exclude<keyof I_1["streamingConfig"]["config"]["speechContexts"][number], keyof SpeechContext>]: never; })[] & { [K_12 in Exclude<keyof I_1["streamingConfig"]["config"]["speechContexts"], keyof {
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
                } & { [K_13 in Exclude<keyof I_1["streamingConfig"]["config"]["diarizationConfig"], keyof SpeakerDiarizationConfig>]: never; }) | undefined;
                customConfiguration?: ({
                    [x: string]: string | undefined;
                } & {
                    [x: string]: string | undefined;
                } & { [K_14 in Exclude<keyof I_1["streamingConfig"]["config"]["customConfiguration"], string | number>]: never; }) | undefined;
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
                } & { [K_15 in Exclude<keyof I_1["streamingConfig"]["config"]["endpointingConfig"], keyof EndpointingConfig>]: never; }) | undefined;
            } & { [K_16 in Exclude<keyof I_1["streamingConfig"]["config"], keyof RecognitionConfig>]: never; }) | undefined;
            interimResults?: boolean | undefined;
        } & { [K_17 in Exclude<keyof I_1["streamingConfig"], keyof StreamingRecognitionConfig>]: never; }) | undefined;
        audioContent?: Uint8Array | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_18 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_19 in Exclude<keyof I_1, keyof StreamingRecognizeRequest>]: never; }>(object: I_1): StreamingRecognizeRequest;
};
export declare const EndpointingConfig: {
    encode(message: EndpointingConfig, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): EndpointingConfig;
    fromJSON(object: any): EndpointingConfig;
    toJSON(message: EndpointingConfig): unknown;
    create<I extends {
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
    } & { [K in Exclude<keyof I, keyof EndpointingConfig>]: never; }>(base?: I): EndpointingConfig;
    fromPartial<I_1 extends {
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
    } & { [K_1 in Exclude<keyof I_1, keyof EndpointingConfig>]: never; }>(object: I_1): EndpointingConfig;
};
export declare const RecognitionConfig: {
    encode(message: RecognitionConfig, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RecognitionConfig;
    fromJSON(object: any): RecognitionConfig;
    toJSON(message: RecognitionConfig): unknown;
    create<I extends {
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
            phrases?: (string[] & string[] & { [K in Exclude<keyof I["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
            boost?: number | undefined;
        } & { [K_1 in Exclude<keyof I["speechContexts"][number], keyof SpeechContext>]: never; })[] & { [K_2 in Exclude<keyof I["speechContexts"], keyof {
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
        } & { [K_3 in Exclude<keyof I["diarizationConfig"], keyof SpeakerDiarizationConfig>]: never; }) | undefined;
        customConfiguration?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_4 in Exclude<keyof I["customConfiguration"], string | number>]: never; }) | undefined;
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
        } & { [K_5 in Exclude<keyof I["endpointingConfig"], keyof EndpointingConfig>]: never; }) | undefined;
    } & { [K_6 in Exclude<keyof I, keyof RecognitionConfig>]: never; }>(base?: I): RecognitionConfig;
    fromPartial<I_1 extends {
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
            phrases?: (string[] & string[] & { [K_7 in Exclude<keyof I_1["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
            boost?: number | undefined;
        } & { [K_8 in Exclude<keyof I_1["speechContexts"][number], keyof SpeechContext>]: never; })[] & { [K_9 in Exclude<keyof I_1["speechContexts"], keyof {
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
        } & { [K_10 in Exclude<keyof I_1["diarizationConfig"], keyof SpeakerDiarizationConfig>]: never; }) | undefined;
        customConfiguration?: ({
            [x: string]: string | undefined;
        } & {
            [x: string]: string | undefined;
        } & { [K_11 in Exclude<keyof I_1["customConfiguration"], string | number>]: never; }) | undefined;
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
        } & { [K_12 in Exclude<keyof I_1["endpointingConfig"], keyof EndpointingConfig>]: never; }) | undefined;
    } & { [K_13 in Exclude<keyof I_1, keyof RecognitionConfig>]: never; }>(object: I_1): RecognitionConfig;
};
export declare const RecognitionConfig_CustomConfigurationEntry: {
    encode(message: RecognitionConfig_CustomConfigurationEntry, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RecognitionConfig_CustomConfigurationEntry;
    fromJSON(object: any): RecognitionConfig_CustomConfigurationEntry;
    toJSON(message: RecognitionConfig_CustomConfigurationEntry): unknown;
    create<I extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K in Exclude<keyof I, keyof RecognitionConfig_CustomConfigurationEntry>]: never; }>(base?: I): RecognitionConfig_CustomConfigurationEntry;
    fromPartial<I_1 extends {
        key?: string | undefined;
        value?: string | undefined;
    } & {
        key?: string | undefined;
        value?: string | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof RecognitionConfig_CustomConfigurationEntry>]: never; }>(object: I_1): RecognitionConfig_CustomConfigurationEntry;
};
export declare const StreamingRecognitionConfig: {
    encode(message: StreamingRecognitionConfig, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StreamingRecognitionConfig;
    fromJSON(object: any): StreamingRecognitionConfig;
    toJSON(message: StreamingRecognitionConfig): unknown;
    create<I extends {
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
                phrases?: (string[] & string[] & { [K in Exclude<keyof I["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                boost?: number | undefined;
            } & { [K_1 in Exclude<keyof I["config"]["speechContexts"][number], keyof SpeechContext>]: never; })[] & { [K_2 in Exclude<keyof I["config"]["speechContexts"], keyof {
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
            } & { [K_3 in Exclude<keyof I["config"]["diarizationConfig"], keyof SpeakerDiarizationConfig>]: never; }) | undefined;
            customConfiguration?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_4 in Exclude<keyof I["config"]["customConfiguration"], string | number>]: never; }) | undefined;
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
            } & { [K_5 in Exclude<keyof I["config"]["endpointingConfig"], keyof EndpointingConfig>]: never; }) | undefined;
        } & { [K_6 in Exclude<keyof I["config"], keyof RecognitionConfig>]: never; }) | undefined;
        interimResults?: boolean | undefined;
    } & { [K_7 in Exclude<keyof I, keyof StreamingRecognitionConfig>]: never; }>(base?: I): StreamingRecognitionConfig;
    fromPartial<I_1 extends {
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
                phrases?: (string[] & string[] & { [K_8 in Exclude<keyof I_1["config"]["speechContexts"][number]["phrases"], keyof string[]>]: never; }) | undefined;
                boost?: number | undefined;
            } & { [K_9 in Exclude<keyof I_1["config"]["speechContexts"][number], keyof SpeechContext>]: never; })[] & { [K_10 in Exclude<keyof I_1["config"]["speechContexts"], keyof {
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
            } & { [K_11 in Exclude<keyof I_1["config"]["diarizationConfig"], keyof SpeakerDiarizationConfig>]: never; }) | undefined;
            customConfiguration?: ({
                [x: string]: string | undefined;
            } & {
                [x: string]: string | undefined;
            } & { [K_12 in Exclude<keyof I_1["config"]["customConfiguration"], string | number>]: never; }) | undefined;
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
            } & { [K_13 in Exclude<keyof I_1["config"]["endpointingConfig"], keyof EndpointingConfig>]: never; }) | undefined;
        } & { [K_14 in Exclude<keyof I_1["config"], keyof RecognitionConfig>]: never; }) | undefined;
        interimResults?: boolean | undefined;
    } & { [K_15 in Exclude<keyof I_1, keyof StreamingRecognitionConfig>]: never; }>(object: I_1): StreamingRecognitionConfig;
};
export declare const SpeakerDiarizationConfig: {
    encode(message: SpeakerDiarizationConfig, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SpeakerDiarizationConfig;
    fromJSON(object: any): SpeakerDiarizationConfig;
    toJSON(message: SpeakerDiarizationConfig): unknown;
    create<I extends {
        enableSpeakerDiarization?: boolean | undefined;
        maxSpeakerCount?: number | undefined;
    } & {
        enableSpeakerDiarization?: boolean | undefined;
        maxSpeakerCount?: number | undefined;
    } & { [K in Exclude<keyof I, keyof SpeakerDiarizationConfig>]: never; }>(base?: I): SpeakerDiarizationConfig;
    fromPartial<I_1 extends {
        enableSpeakerDiarization?: boolean | undefined;
        maxSpeakerCount?: number | undefined;
    } & {
        enableSpeakerDiarization?: boolean | undefined;
        maxSpeakerCount?: number | undefined;
    } & { [K_1 in Exclude<keyof I_1, keyof SpeakerDiarizationConfig>]: never; }>(object: I_1): SpeakerDiarizationConfig;
};
export declare const SpeechContext: {
    encode(message: SpeechContext, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SpeechContext;
    fromJSON(object: any): SpeechContext;
    toJSON(message: SpeechContext): unknown;
    create<I extends {
        phrases?: string[] | undefined;
        boost?: number | undefined;
    } & {
        phrases?: (string[] & string[] & { [K in Exclude<keyof I["phrases"], keyof string[]>]: never; }) | undefined;
        boost?: number | undefined;
    } & { [K_1 in Exclude<keyof I, keyof SpeechContext>]: never; }>(base?: I): SpeechContext;
    fromPartial<I_1 extends {
        phrases?: string[] | undefined;
        boost?: number | undefined;
    } & {
        phrases?: (string[] & string[] & { [K_2 in Exclude<keyof I_1["phrases"], keyof string[]>]: never; }) | undefined;
        boost?: number | undefined;
    } & { [K_3 in Exclude<keyof I_1, keyof SpeechContext>]: never; }>(object: I_1): SpeechContext;
};
export declare const RecognizeResponse: {
    encode(message: RecognizeResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): RecognizeResponse;
    fromJSON(object: any): RecognizeResponse;
    toJSON(message: RecognizeResponse): unknown;
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
                } & { [K in Exclude<keyof I["results"][number]["alternatives"][number]["words"][number], keyof WordInfo>]: never; })[] & { [K_1 in Exclude<keyof I["results"][number]["alternatives"][number]["words"], keyof {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["results"][number]["alternatives"][number], keyof SpeechRecognitionAlternative>]: never; })[] & { [K_3 in Exclude<keyof I["results"][number]["alternatives"], keyof {
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
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        } & { [K_4 in Exclude<keyof I["results"][number], keyof SpeechRecognitionResult>]: never; })[] & { [K_5 in Exclude<keyof I["results"], keyof {
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
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        }[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_6 in Exclude<keyof I["id"], "value">]: never; }) | undefined;
    } & { [K_7 in Exclude<keyof I, keyof RecognizeResponse>]: never; }>(base?: I): RecognizeResponse;
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
                } & { [K_8 in Exclude<keyof I_1["results"][number]["alternatives"][number]["words"][number], keyof WordInfo>]: never; })[] & { [K_9 in Exclude<keyof I_1["results"][number]["alternatives"][number]["words"], keyof {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_10 in Exclude<keyof I_1["results"][number]["alternatives"][number], keyof SpeechRecognitionAlternative>]: never; })[] & { [K_11 in Exclude<keyof I_1["results"][number]["alternatives"], keyof {
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
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        } & { [K_12 in Exclude<keyof I_1["results"][number], keyof SpeechRecognitionResult>]: never; })[] & { [K_13 in Exclude<keyof I_1["results"], keyof {
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
            channelTag?: number | undefined;
            audioProcessed?: number | undefined;
        }[]>]: never; }) | undefined;
        id?: ({
            value?: string | undefined;
        } & {
            value?: string | undefined;
        } & { [K_14 in Exclude<keyof I_1["id"], "value">]: never; }) | undefined;
    } & { [K_15 in Exclude<keyof I_1, keyof RecognizeResponse>]: never; }>(object: I_1): RecognizeResponse;
};
export declare const SpeechRecognitionResult: {
    encode(message: SpeechRecognitionResult, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SpeechRecognitionResult;
    fromJSON(object: any): SpeechRecognitionResult;
    toJSON(message: SpeechRecognitionResult): unknown;
    create<I extends {
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
            } & { [K in Exclude<keyof I["alternatives"][number]["words"][number], keyof WordInfo>]: never; })[] & { [K_1 in Exclude<keyof I["alternatives"][number]["words"], keyof {
                startTime?: number | undefined;
                endTime?: number | undefined;
                word?: string | undefined;
                confidence?: number | undefined;
                speakerTag?: number | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["alternatives"][number], keyof SpeechRecognitionAlternative>]: never; })[] & { [K_3 in Exclude<keyof I["alternatives"], keyof {
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
        channelTag?: number | undefined;
        audioProcessed?: number | undefined;
    } & { [K_4 in Exclude<keyof I, keyof SpeechRecognitionResult>]: never; }>(base?: I): SpeechRecognitionResult;
    fromPartial<I_1 extends {
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
            } & { [K_5 in Exclude<keyof I_1["alternatives"][number]["words"][number], keyof WordInfo>]: never; })[] & { [K_6 in Exclude<keyof I_1["alternatives"][number]["words"], keyof {
                startTime?: number | undefined;
                endTime?: number | undefined;
                word?: string | undefined;
                confidence?: number | undefined;
                speakerTag?: number | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I_1["alternatives"][number], keyof SpeechRecognitionAlternative>]: never; })[] & { [K_8 in Exclude<keyof I_1["alternatives"], keyof {
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
        channelTag?: number | undefined;
        audioProcessed?: number | undefined;
    } & { [K_9 in Exclude<keyof I_1, keyof SpeechRecognitionResult>]: never; }>(object: I_1): SpeechRecognitionResult;
};
export declare const SpeechRecognitionAlternative: {
    encode(message: SpeechRecognitionAlternative, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): SpeechRecognitionAlternative;
    fromJSON(object: any): SpeechRecognitionAlternative;
    toJSON(message: SpeechRecognitionAlternative): unknown;
    create<I extends {
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
        } & { [K in Exclude<keyof I["words"][number], keyof WordInfo>]: never; })[] & { [K_1 in Exclude<keyof I["words"], keyof {
            startTime?: number | undefined;
            endTime?: number | undefined;
            word?: string | undefined;
            confidence?: number | undefined;
            speakerTag?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_2 in Exclude<keyof I, keyof SpeechRecognitionAlternative>]: never; }>(base?: I): SpeechRecognitionAlternative;
    fromPartial<I_1 extends {
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
        } & { [K_3 in Exclude<keyof I_1["words"][number], keyof WordInfo>]: never; })[] & { [K_4 in Exclude<keyof I_1["words"], keyof {
            startTime?: number | undefined;
            endTime?: number | undefined;
            word?: string | undefined;
            confidence?: number | undefined;
            speakerTag?: number | undefined;
        }[]>]: never; }) | undefined;
    } & { [K_5 in Exclude<keyof I_1, keyof SpeechRecognitionAlternative>]: never; }>(object: I_1): SpeechRecognitionAlternative;
};
export declare const WordInfo: {
    encode(message: WordInfo, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): WordInfo;
    fromJSON(object: any): WordInfo;
    toJSON(message: WordInfo): unknown;
    create<I extends {
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
    } & { [K in Exclude<keyof I, keyof WordInfo>]: never; }>(base?: I): WordInfo;
    fromPartial<I_1 extends {
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
    } & { [K_1 in Exclude<keyof I_1, keyof WordInfo>]: never; }>(object: I_1): WordInfo;
};
export declare const StreamingRecognizeResponse: {
    encode(message: StreamingRecognizeResponse, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StreamingRecognizeResponse;
    fromJSON(object: any): StreamingRecognizeResponse;
    toJSON(message: StreamingRecognizeResponse): unknown;
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
                } & { [K in Exclude<keyof I["results"][number]["alternatives"][number]["words"][number], keyof WordInfo>]: never; })[] & { [K_1 in Exclude<keyof I["results"][number]["alternatives"][number]["words"], keyof {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_2 in Exclude<keyof I["results"][number]["alternatives"][number], keyof SpeechRecognitionAlternative>]: never; })[] & { [K_3 in Exclude<keyof I["results"][number]["alternatives"], keyof {
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
    } & { [K_7 in Exclude<keyof I, keyof StreamingRecognizeResponse>]: never; }>(base?: I): StreamingRecognizeResponse;
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
                } & { [K_8 in Exclude<keyof I_1["results"][number]["alternatives"][number]["words"][number], keyof WordInfo>]: never; })[] & { [K_9 in Exclude<keyof I_1["results"][number]["alternatives"][number]["words"], keyof {
                    startTime?: number | undefined;
                    endTime?: number | undefined;
                    word?: string | undefined;
                    confidence?: number | undefined;
                    speakerTag?: number | undefined;
                }[]>]: never; }) | undefined;
            } & { [K_10 in Exclude<keyof I_1["results"][number]["alternatives"][number], keyof SpeechRecognitionAlternative>]: never; })[] & { [K_11 in Exclude<keyof I_1["results"][number]["alternatives"], keyof {
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
    } & { [K_15 in Exclude<keyof I_1, keyof StreamingRecognizeResponse>]: never; }>(object: I_1): StreamingRecognizeResponse;
};
export declare const StreamingRecognitionResult: {
    encode(message: StreamingRecognitionResult, writer?: BinaryWriter): BinaryWriter;
    decode(input: BinaryReader | Uint8Array, length?: number): StreamingRecognitionResult;
    fromJSON(object: any): StreamingRecognitionResult;
    toJSON(message: StreamingRecognitionResult): unknown;
    create<I extends {
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
            } & { [K in Exclude<keyof I["alternatives"][number]["words"][number], keyof WordInfo>]: never; })[] & { [K_1 in Exclude<keyof I["alternatives"][number]["words"], keyof {
                startTime?: number | undefined;
                endTime?: number | undefined;
                word?: string | undefined;
                confidence?: number | undefined;
                speakerTag?: number | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_2 in Exclude<keyof I["alternatives"][number], keyof SpeechRecognitionAlternative>]: never; })[] & { [K_3 in Exclude<keyof I["alternatives"], keyof {
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
    } & { [K_4 in Exclude<keyof I, keyof StreamingRecognitionResult>]: never; }>(base?: I): StreamingRecognitionResult;
    fromPartial<I_1 extends {
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
            } & { [K_5 in Exclude<keyof I_1["alternatives"][number]["words"][number], keyof WordInfo>]: never; })[] & { [K_6 in Exclude<keyof I_1["alternatives"][number]["words"], keyof {
                startTime?: number | undefined;
                endTime?: number | undefined;
                word?: string | undefined;
                confidence?: number | undefined;
                speakerTag?: number | undefined;
            }[]>]: never; }) | undefined;
        } & { [K_7 in Exclude<keyof I_1["alternatives"][number], keyof SpeechRecognitionAlternative>]: never; })[] & { [K_8 in Exclude<keyof I_1["alternatives"], keyof {
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
    } & { [K_9 in Exclude<keyof I_1, keyof StreamingRecognitionResult>]: never; }>(object: I_1): StreamingRecognitionResult;
};
/**
 * The RivaSpeechRecognition service provides two mechanisms for converting
 * speech to text.
 */
export type RivaSpeechRecognitionService = typeof RivaSpeechRecognitionService;
export declare const RivaSpeechRecognitionService: {
    /**
     * Recognize expects a RecognizeRequest and returns a RecognizeResponse. This
     * request will block until the audio is uploaded, processed, and a transcript
     * is returned.
     */
    readonly recognize: {
        readonly path: "/nvidia.riva.asr.RivaSpeechRecognition/Recognize";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: RecognizeRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => RecognizeRequest;
        readonly responseSerialize: (value: RecognizeResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => RecognizeResponse;
    };
    /**
     * StreamingRecognize is a non-blocking API call that allows audio data to be
     * fed to the server in chunks as it becomes available. Depending on the
     * configuration in the StreamingRecognizeRequest, intermediate results can be
     * sent back to the client. Recognition ends when the stream is closed by the
     * client.
     */
    readonly streamingRecognize: {
        readonly path: "/nvidia.riva.asr.RivaSpeechRecognition/StreamingRecognize";
        readonly requestStream: true;
        readonly responseStream: true;
        readonly requestSerialize: (value: StreamingRecognizeRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => StreamingRecognizeRequest;
        readonly responseSerialize: (value: StreamingRecognizeResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => StreamingRecognizeResponse;
    };
    /**
     * Enables clients to request the configuration of the current ASR service, or
     * a specific model within the service.
     */
    readonly getRivaSpeechRecognitionConfig: {
        readonly path: "/nvidia.riva.asr.RivaSpeechRecognition/GetRivaSpeechRecognitionConfig";
        readonly requestStream: false;
        readonly responseStream: false;
        readonly requestSerialize: (value: RivaSpeechRecognitionConfigRequest) => Buffer;
        readonly requestDeserialize: (value: Buffer) => RivaSpeechRecognitionConfigRequest;
        readonly responseSerialize: (value: RivaSpeechRecognitionConfigResponse) => Buffer;
        readonly responseDeserialize: (value: Buffer) => RivaSpeechRecognitionConfigResponse;
    };
};
export interface RivaSpeechRecognitionServer extends UntypedServiceImplementation {
    /**
     * Recognize expects a RecognizeRequest and returns a RecognizeResponse. This
     * request will block until the audio is uploaded, processed, and a transcript
     * is returned.
     */
    recognize: handleUnaryCall<RecognizeRequest, RecognizeResponse>;
    /**
     * StreamingRecognize is a non-blocking API call that allows audio data to be
     * fed to the server in chunks as it becomes available. Depending on the
     * configuration in the StreamingRecognizeRequest, intermediate results can be
     * sent back to the client. Recognition ends when the stream is closed by the
     * client.
     */
    streamingRecognize: handleBidiStreamingCall<StreamingRecognizeRequest, StreamingRecognizeResponse>;
    /**
     * Enables clients to request the configuration of the current ASR service, or
     * a specific model within the service.
     */
    getRivaSpeechRecognitionConfig: handleUnaryCall<RivaSpeechRecognitionConfigRequest, RivaSpeechRecognitionConfigResponse>;
}
export interface RivaSpeechRecognitionClient extends Client {
    /**
     * Recognize expects a RecognizeRequest and returns a RecognizeResponse. This
     * request will block until the audio is uploaded, processed, and a transcript
     * is returned.
     */
    recognize(request: RecognizeRequest, callback: (error: ServiceError | null, response: RecognizeResponse) => void): ClientUnaryCall;
    recognize(request: RecognizeRequest, metadata: Metadata, callback: (error: ServiceError | null, response: RecognizeResponse) => void): ClientUnaryCall;
    recognize(request: RecognizeRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: RecognizeResponse) => void): ClientUnaryCall;
    /**
     * StreamingRecognize is a non-blocking API call that allows audio data to be
     * fed to the server in chunks as it becomes available. Depending on the
     * configuration in the StreamingRecognizeRequest, intermediate results can be
     * sent back to the client. Recognition ends when the stream is closed by the
     * client.
     */
    streamingRecognize(): ClientDuplexStream<StreamingRecognizeRequest, StreamingRecognizeResponse>;
    streamingRecognize(options: Partial<CallOptions>): ClientDuplexStream<StreamingRecognizeRequest, StreamingRecognizeResponse>;
    streamingRecognize(metadata: Metadata, options?: Partial<CallOptions>): ClientDuplexStream<StreamingRecognizeRequest, StreamingRecognizeResponse>;
    /**
     * Enables clients to request the configuration of the current ASR service, or
     * a specific model within the service.
     */
    getRivaSpeechRecognitionConfig(request: RivaSpeechRecognitionConfigRequest, callback: (error: ServiceError | null, response: RivaSpeechRecognitionConfigResponse) => void): ClientUnaryCall;
    getRivaSpeechRecognitionConfig(request: RivaSpeechRecognitionConfigRequest, metadata: Metadata, callback: (error: ServiceError | null, response: RivaSpeechRecognitionConfigResponse) => void): ClientUnaryCall;
    getRivaSpeechRecognitionConfig(request: RivaSpeechRecognitionConfigRequest, metadata: Metadata, options: Partial<CallOptions>, callback: (error: ServiceError | null, response: RivaSpeechRecognitionConfigResponse) => void): ClientUnaryCall;
}
export declare const RivaSpeechRecognitionClient: {
    new (address: string, credentials: ChannelCredentials, options?: Partial<ClientOptions>): RivaSpeechRecognitionClient;
    service: typeof RivaSpeechRecognitionService;
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
