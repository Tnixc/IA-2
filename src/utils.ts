const API_URL = "http://192.168.2.97:9000/asr";

export async function transcribe(audio: Blob) {
  console.log("recieved audio file", audio);
  const params = new URLSearchParams({
    task: "transcribe",
    output: "json",
    word_timestamps: "true",
  });

  const formData = new FormData();
  formData.append("audio_file", audio, "audio.wav");

  const response = await fetch(`${API_URL}?${params.toString()}`, {
    method: "POST",
    body: formData,
  });

  if (response.ok) {
    const data = await response.json();
    console.log(data);
    return data;
  } else {
    console.error(response.status, response.statusText);
    return null;
  }
}
