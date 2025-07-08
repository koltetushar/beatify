export async function uploadAudioForVisualization(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/upload-visualize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text(); // in case server returned a string error
        throw new Error(text || 'Upload failed');
      }

      const data = await response.json();
      console.log(data)
      return data;
    } catch (error) {
      throw error;
    }
  }
