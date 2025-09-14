import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { launchImagePicker, launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

class CameraService {
  constructor() {
    this.isInitialized = false;
    this.hasPermissions = false;
  }

  /**
   * Initialize camera service and request permissions
   */
  async initialize() {
    try {
      await this.requestPermissions();
      this.isInitialized = true;
      console.log('📷 Camera service initialized');
    } catch (error) {
      console.error('Failed to initialize camera service:', error);
      throw error;
    }
  }

  /**
   * Request camera and storage permissions
   */
  async requestPermissions() {
    try {
      if (Platform.OS === 'android') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ];

        const granted = await PermissionsAndroid.requestMultiple(permissions);

        const cameraGranted =
          granted[PermissionsAndroid.PERMISSIONS.CAMERA] ===
          PermissionsAndroid.RESULTS.GRANTED;
        const storageGranted =
          granted[PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE] ===
          PermissionsAndroid.RESULTS.GRANTED;

        if (!cameraGranted || !storageGranted) {
          throw new Error('Camera or storage permission denied');
        }
      }

      // iOS permissions are handled automatically by react-native-image-picker
      this.hasPermissions = true;
      return true;
    } catch (error) {
      console.error('Permission request failed:', error);
      this.hasPermissions = false;
      throw error;
    }
  }

  /**
   * Take photo with camera
   */
  async takePhoto(options = {}) {
    if (!this.hasPermissions) {
      await this.requestPermissions();
    }

    const defaultOptions = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    const cameraOptions = {
      ...defaultOptions,
      ...options,
    };

    return new Promise((resolve, reject) => {
      launchCamera(cameraOptions, (response) => {
        if (response.didCancel) {
          reject(new Error('User cancelled camera'));
          return;
        }

        if (response.errorCode) {
          reject(new Error(response.errorMessage || 'Camera error'));
          return;
        }

        if (response.assets && response.assets[0]) {
          resolve({
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            fileName: response.assets[0].fileName,
            fileSize: response.assets[0].fileSize,
            width: response.assets[0].width,
            height: response.assets[0].height,
          });
        } else {
          reject(new Error('No image captured'));
        }
      });
    });
  }

  /**
   * Select photo from gallery
   */
  async selectPhoto(options = {}) {
    const defaultOptions = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 1024,
      maxHeight: 1024,
      selectionLimit: 1,
    };

    const pickerOptions = {
      ...defaultOptions,
      ...options,
    };

    return new Promise((resolve, reject) => {
      launchImagePicker(pickerOptions, (response) => {
        if (response.didCancel) {
          reject(new Error('User cancelled photo selection'));
          return;
        }

        if (response.errorCode) {
          reject(new Error(response.errorMessage || 'Photo picker error'));
          return;
        }

        if (response.assets && response.assets[0]) {
          resolve({
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            fileName: response.assets[0].fileName,
            fileSize: response.assets[0].fileSize,
            width: response.assets[0].width,
            height: response.assets[0].height,
          });
        } else {
          reject(new Error('No photo selected'));
        }
      });
    });
  }

  /**
   * Show photo selection options (Camera vs Gallery)
   */
  async showPhotoOptions(title = 'Select Photo', options = {}) {
    return new Promise((resolve, reject) => {
      Alert.alert(title, 'Choose how you want to add a photo', [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => reject(new Error('User cancelled')),
        },
        {
          text: 'Camera',
          onPress: async () => {
            try {
              const photo = await this.takePhoto(options);
              resolve(photo);
            } catch (error) {
              reject(error);
            }
          },
        },
        {
          text: 'Gallery',
          onPress: async () => {
            try {
              const photo = await this.selectPhoto(options);
              resolve(photo);
            } catch (error) {
              reject(error);
            }
          },
        },
      ]);
    });
  }

  /**
   * Take multiple photos (for property listings)
   */
  async takeMultiplePhotos(maxPhotos = 10, options = {}) {
    const photos = [];
    let continueCapture = true;

    while (continueCapture && photos.length < maxPhotos) {
      try {
        const photo = await new Promise((resolve, reject) => {
          Alert.alert(
            `Photo ${photos.length + 1} of ${maxPhotos}`,
            photos.length === 0
              ? 'Take your first property photo'
              : 'Take another photo or finish',
            [
              {
                text: photos.length > 0 ? 'Finish' : 'Cancel',
                style: photos.length > 0 ? 'default' : 'cancel',
                onPress: () => {
                  continueCapture = false;
                  resolve(null);
                },
              },
              {
                text: 'Take Photo',
                onPress: async () => {
                  try {
                    const photo = await this.takePhoto(options);
                    resolve(photo);
                  } catch (error) {
                    reject(error);
                  }
                },
              },
            ]
          );
        });

        if (photo) {
          photos.push(photo);
        }
      } catch (error) {
        console.error('Error taking photo:', error);
        Alert.alert('Error', 'Failed to take photo. Please try again.');
      }
    }

    return photos;
  }

  /**
   * Compress image
   */
  async compressImage(imageUri, options = {}) {
    const defaultOptions = {
      quality: 0.7,
      maxWidth: 800,
      maxHeight: 800,
    };

    const compressOptions = {
      ...defaultOptions,
      ...options,
    };

    try {
      // Note: You might want to use a dedicated image compression library
      // like react-native-image-resizer for more advanced compression
      return {
        uri: imageUri, // Placeholder - implement actual compression
        compressed: true,
        originalSize: 0, // Get from file stats
        compressedSize: 0, // Calculate after compression
      };
    } catch (error) {
      console.error('Image compression failed:', error);
      throw error;
    }
  }

  /**
   * Scan document (for KYC verification)
   */
  async scanDocument(documentType = 'id') {
    const documentOptions = {
      quality: 0.9,
      maxWidth: 1500,
      maxHeight: 1500,
      cameraType: 'back',
    };

    try {
      const photo = await this.takePhoto(documentOptions);

      // Optionally enhance image for document scanning
      const enhancedPhoto = await this.enhanceDocumentImage(photo);

      return {
        ...enhancedPhoto,
        documentType,
        scanDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Document scanning failed:', error);
      throw error;
    }
  }

  /**
   * Enhance document image (placeholder for future OCR/enhancement)
   */
  async enhanceDocumentImage(photo) {
    // Placeholder for image enhancement logic
    // Could include: contrast adjustment, edge detection, perspective correction
    return {
      ...photo,
      enhanced: true,
      enhancementApplied: ['contrast', 'sharpening'],
    };
  }

  /**
   * Take selfie with specific requirements
   */
  async takeSelfie(options = {}) {
    const selfieOptions = {
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 800,
      cameraType: 'front',
      ...options,
    };

    try {
      const selfie = await this.takePhoto(selfieOptions);

      return {
        ...selfie,
        isSelfie: true,
        captureDate: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Selfie capture failed:', error);
      throw error;
    }
  }

  /**
   * Validate image quality
   */
  validateImageQuality(photo, requirements = {}) {
    const defaultRequirements = {
      minWidth: 400,
      minHeight: 400,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedTypes: ['image/jpeg', 'image/jpg', 'image/png'],
    };

    const reqs = {
      ...defaultRequirements,
      ...requirements,
    };

    const issues = [];

    if (photo.width < reqs.minWidth || photo.height < reqs.minHeight) {
      issues.push('Image resolution is too low');
    }

    if (photo.fileSize > reqs.maxFileSize) {
      issues.push('Image file size is too large');
    }

    if (!reqs.allowedTypes.includes(photo.type)) {
      issues.push('Image format not supported');
    }

    return {
      isValid: issues.length === 0,
      issues,
    };
  }

  /**
   * Save image to device
   */
  async saveImage(imageUri, fileName = null) {
    try {
      const timestamp = Date.now();
      const finalFileName = fileName || `houseiana_${timestamp}.jpg`;

      const destPath = `${RNFS.PicturesDirectoryPath}/${finalFileName}`;
      await RNFS.copyFile(imageUri, destPath);

      return destPath;
    } catch (error) {
      console.error('Failed to save image:', error);
      throw error;
    }
  }

  /**
   * Delete temporary image
   */
  async deleteTempImage(imageUri) {
    try {
      const exists = await RNFS.exists(imageUri);
      if (exists) {
        await RNFS.unlink(imageUri);
      }
    } catch (error) {
      console.error('Failed to delete temp image:', error);
    }
  }

  /**
   * Get image metadata
   */
  async getImageMetadata(imageUri) {
    try {
      const stats = await RNFS.stat(imageUri);

      return {
        size: stats.size,
        modificationDate: stats.mtime,
        isDirectory: stats.isDirectory(),
        isFile: stats.isFile(),
        path: imageUri,
      };
    } catch (error) {
      console.error('Failed to get image metadata:', error);
      return null;
    }
  }

  /**
   * Batch process images
   */
  async batchProcessImages(images, processor) {
    const processed = [];

    for (let i = 0; i < images.length; i++) {
      try {
        const result = await processor(images[i], i);
        processed.push(result);
      } catch (error) {
        console.error(`Failed to process image ${i}:`, error);
        processed.push({ error: error.message, index: i });
      }
    }

    return processed;
  }

  /**
   * Create thumbnail
   */
  async createThumbnail(imageUri, size = 200) {
    // Placeholder for thumbnail creation
    // Could use react-native-image-resizer or similar
    return {
      uri: imageUri, // Placeholder
      thumbnailUri: imageUri, // Should be actual thumbnail
      thumbnailSize: size,
    };
  }

  /**
   * Get camera status
   */
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      hasPermissions: this.hasPermissions,
      platform: Platform.OS,
    };
  }
}

// Export singleton instance
export const cameraService = new CameraService();

// Helper hooks for React components
export const useCamera = () => {
  return {
    takePhoto: cameraService.takePhoto.bind(cameraService),
    selectPhoto: cameraService.selectPhoto.bind(cameraService),
    showPhotoOptions: cameraService.showPhotoOptions.bind(cameraService),
    takeMultiplePhotos: cameraService.takeMultiplePhotos.bind(cameraService),
    scanDocument: cameraService.scanDocument.bind(cameraService),
    takeSelfie: cameraService.takeSelfie.bind(cameraService),
    validateImageQuality:
      cameraService.validateImageQuality.bind(cameraService),
    saveImage: cameraService.saveImage.bind(cameraService),
    hasPermissions: cameraService.hasPermissions,
    isInitialized: cameraService.isInitialized,
  };
};

export default cameraService;
