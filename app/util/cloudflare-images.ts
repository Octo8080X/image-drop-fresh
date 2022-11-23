function bufferToHex(buffer: ArrayBufferLike) {
  return [...new Uint8Array(buffer)].map((x) => x.toString(16).padStart(2, "0"))
    .join(
      "",
    );
}

export async function generateSignedUrl(
  accountHash: string,
  objectId: string,
  variant: string,
  expireSeconds: number,
  signKey: string,
) {
  const unsignedUrl = new URL(
    `https://imagedelivery.net/${accountHash}/${objectId}/${variant}`,
  );

  const encoder = new TextEncoder();
  const secretKeyData = encoder.encode(signKey);
  const key = await crypto.subtle.importKey(
    "raw",
    secretKeyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const expiry = Math.floor(Date.now() / 1000) + expireSeconds;
  unsignedUrl.searchParams.set("exp", expiry.toString());

  const stringToSign = unsignedUrl.pathname + "?" +
    unsignedUrl.searchParams.toString();
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(stringToSign),
  );
  const sig = bufferToHex(new Uint8Array(mac).buffer);

  unsignedUrl.searchParams.set("sig", sig);

  return unsignedUrl.href;
}
