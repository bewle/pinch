
export function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
        const blob = new Blob([file], { type: file.type });
        const imageUrl = URL.createObjectURL(blob);
        return imageUrl;
    }
    return "";
}
