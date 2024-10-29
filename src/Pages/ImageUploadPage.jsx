import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { MdBlock, MdDelete } from "react-icons/md";
import Header from "../Layouts/Header";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import { getImages } from "../Features/Images/ImageSice"; // Make sure this path is correct

// Define the drag-and-drop item type
const ItemType = "MediaItem";

const ImageUploadPage = () => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.imageAll?.images);
  const [uploadedMedia, setUploadedMedia] = useState([]);
  const [mainMedia, setMainMedia] = useState(null);
  const [mainType, setMainType] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const newMedia = acceptedFiles.map((file) => {
      const previewUrl = URL.createObjectURL(file);
      const fileType = file.type.startsWith("video/") ? "video" : "image";
      return {
        preview: previewUrl,
        type: fileType,
        file,
      };
    });

    setUploadedMedia((prevMedia) => [...prevMedia, ...newMedia]);

    if (!mainMedia && newMedia.length > 0) {
      setMainMedia(newMedia[0].preview);
      setMainType(newMedia[0].type);
    }
  };

  const removeMedia = (indexToRemove) => {
    setUploadedMedia((prevMedia) =>
      prevMedia.filter((_, index) => index !== indexToRemove)
    );
  };

  const moveMedia = (dragIndex, hoverIndex) => {
    const draggedMedia = uploadedMedia[dragIndex];
    const reorderedMedia = [...uploadedMedia];
    reorderedMedia.splice(dragIndex, 1);
    reorderedMedia.splice(hoverIndex, 0, draggedMedia);
    setUploadedMedia(reorderedMedia);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*,video/*",
    multiple: true,
  });

  const uploadImages = async () => {
    setUploading(true);
    setIsLoading(true);
    setProgress(0);

    const formData = new FormData();
    uploadedMedia.forEach((media) => {
      formData.append("zipfile", media.file);
    });

    const totalFiles = uploadedMedia.length;
    let completedFiles = 0;

    const updateProgress = (loaded, total) => {
      const percent = Math.floor((loaded / total) * 100);
      setProgress((prevProgress) => prevProgress + percent / totalFiles);
    };

    try {
      await Promise.all(
        uploadedMedia.map((media) => {
          const singleFormData = new FormData();
          singleFormData.append("zipfile", media.file);

          return axios
            .post(
              "http://localhost:8081/api/v1/images/upload/bulk-upload",
              singleFormData,
              {
                onUploadProgress: (progressEvent) => {
                  updateProgress(progressEvent.loaded, progressEvent.total);
                },
              }
            )
            .then(() => {
              completedFiles++;
              if (completedFiles === totalFiles) {
                setProgress(100);
              }
            });
        })
      );
    } catch (error) {
      console.error("Error uploading images:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request made but no response received:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    } finally {
      setUploading(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  return (
    <Fragment>
      <div className="h-screen w-full">
        <div
          className="h-[200px] rounded-bl-3xl rounded-br-3xl overflow-hidden bg-cover border-2 bg-center z-10"
          style={{ backgroundImage: "url('/assets/vector.png')" }}
        >
          <Header title="Inventory" />
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-5 justify-center items-center h-[200px]">
            <div className="loader"></div>
            <p className="capitalize text-center font-semibold text-gray-600">
              Wait until the images get uploaded
            </p>
          </div>
        ) : (
          <div className="w-[95%] px-2 py-2 -mt-32 z-40 m-auto h-[70vh] bg-white rounded-lg relative flex gap-2 items-center">
            <div
              {...getRootProps()}
              className={`border p-2 w-[80%] flex justify-center items-center border-gray-400 border-dashed h-full rounded-lg ${
                isDragActive ? "bg-gray-100" : ""
              }`}
            >
              <input {...getInputProps()} />
              {mainMedia ? (
                mainType === "image" ? (
                  <img
                    className="rounded-lg w-full h-full object-cover"
                    src={mainMedia}
                    alt="Uploaded"
                  />
                ) : (
                  <video
                    className="rounded-lg w-full h-full"
                    controls
                    src={mainMedia}
                  />
                )
              ) : (
                <div className="text-center">
                  <img
                    className="w-[300px] h-[300px] object-contain mt-4"
                    src="/assets/gp.png"
                    alt="Placeholder"
                  />
                </div>
              )}
            </div>

            {/* Media guidelines list & uploaded media */}
            <div className="bg-white h-full w-[20%] border border-gray-400 border-dashed rounded-lg p-4 overflow-y-auto max-h-[70vh]">
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="loader"></div>
                </div>
              ) : (
                <DndProvider backend={HTML5Backend}>
                  <ul>
                    {images.length > 0 ? (
                      images.map((media, index) => (
                        <MediaListItem
                          key={index}
                          media={media}
                          index={index}
                          onClick={() => {
                            setMainMedia(media.preview); // Ensure media.preview has the correct URL
                            setMainType(media.type);
                          }}
                          onRemove={() => removeMedia(index)}
                          moveMedia={moveMedia}
                        />
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <img
                          className="w-[100px] opacity-50 h-[100px] object-contain"
                          src="/assets/picture.png"
                          alt=""
                        />
                        <p className="text-muted text-lg font-semibold text-gray-400">
                          No Images in the List
                        </p>
                      </div>
                    )}
                  </ul>
                </DndProvider>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-center">
          <button
            onClick={uploadImages}
            disabled={uploading || uploadedMedia.length === 0}
            className={`px-4 py-2 text-white bg-blue-500 rounded-lg ${
              uploading ? "opacity-50" : ""
            }`}
          >
            {uploading ? "Uploading..." : "Upload Images"}
          </button>
        </div>

        {uploading && (
          <div className="mt-2 max-w-[500px] mx-auto">
            <div className="bg-gray-300 h-2 rounded-full">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center text-sm">{progress}%</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

// Component to handle individual list items
const MediaListItem = ({ media, index, onClick, onRemove, moveMedia }) => {
  const ref = React.useRef(null);

  const [, drag] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (item.index !== index) {
        moveMedia(item.index, index);
        item.index = index; // Update the index for dragged item
      }
    },
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <img
          className="object-contain rounded"
          src={media.url}
          alt="Uploaded"
        />
      </div>
      <MdDelete
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        className="text-red-600 cursor-pointer"
      />
    </li>
  );
};

export default ImageUploadPage;
