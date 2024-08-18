export declare const protobufPackage = "nvidia.riva";
/**
 * AudioEncoding specifies the encoding of the audio bytes in the encapsulating
 * message.
 */
export declare enum AudioEncoding {
    /** ENCODING_UNSPECIFIED - Not specified. */
    ENCODING_UNSPECIFIED = 0,
    /** LINEAR_PCM - Uncompressed 16-bit signed little-endian samples (Linear PCM). */
    LINEAR_PCM = 1,
    /**
     * FLAC - `FLAC` (Free Lossless Audio
     * Codec) is the recommended encoding because it is
     * lossless--therefore recognition is not compromised--and
     * requires only about half the bandwidth of `LINEAR16`. `FLAC` stream
     * encoding supports 16-bit and 24-bit samples, however, not all fields in
     * `STREAMINFO` are supported.
     */
    FLAC = 2,
    /** MULAW - 8-bit samples that compand 14-bit audio samples using G.711 PCMU/mu-law. */
    MULAW = 3,
    OGGOPUS = 4,
    /** ALAW - 8-bit samples that compand 13-bit audio samples using G.711 PCMU/a-law. */
    ALAW = 20,
    UNRECOGNIZED = -1
}
export declare function audioEncodingFromJSON(object: any): AudioEncoding;
export declare function audioEncodingToJSON(object: AudioEncoding): string;
