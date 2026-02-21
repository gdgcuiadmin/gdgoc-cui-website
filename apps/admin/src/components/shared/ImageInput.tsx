interface ImageInputProps {
  selectedImage: File | null;
  setSelectedImage: (image: File | null) => void;
  existingImage?: string;
  isRequired?: boolean;
}

const ImageInput: React.FC<ImageInputProps> = ({
  selectedImage,
  setSelectedImage,
  existingImage,
  isRequired,
}) => {
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setSelectedImage(e.target.files ? e.target.files[0] : null)
        }
        required={isRequired}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-google-blue focus:border-transparent"
      />
      {selectedImage ? (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt="New Preview"
          className="mt-2 w-20 h-20 object-cover rounded-lg"
        />
      ) : (
        existingImage && (
          <img
            src={existingImage}
            alt="Current"
            className="mt-2 w-20 h-20 object-cover rounded-lg"
          />
        )
      )}
    </div>
  );
};

export default ImageInput;
