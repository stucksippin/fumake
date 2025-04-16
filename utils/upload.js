export async function uploadImage(file, category) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', category);

    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    return await response.json();
}
