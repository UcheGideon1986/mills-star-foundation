// Cloudinary Service for Image Uploads
// This will replace localStorage with real cloud storage

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

interface UploadOptions {
  folder?: string;
  transformation?: string;
  tags?: string[];
}

class CloudinaryService {
  private cloudName: string;
  private uploadPreset: string;
  private apiUrl: string;

  constructor() {
    // Get from environment variables
    this.cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || '';
    this.uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || '';
    this.apiUrl = `https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`;
  }

  /**
   * Upload image to Cloudinary
   * @param file - Image file to upload
   * @param options - Upload options (folder, tags, etc.)
   * @returns Promise with Cloudinary response
   */
  async uploadImage(
    file: File,
    options: UploadOptions = {}
  ): Promise<CloudinaryUploadResponse> {
    if (!this.cloudName || !this.uploadPreset) {
      throw new Error(
        'Cloudinary credentials not configured. Please set VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET in .env file'
      );
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);

    // Add optional parameters
    if (options.folder) {
      formData.append('folder', options.folder);
    }

    if (options.tags && options.tags.length > 0) {
      formData.append('tags', options.tags.join(','));
    }

    // Add automatic optimizations
    formData.append('quality', 'auto');
    formData.append('fetch_format', 'auto');

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'Upload failed');
      }

      const data: CloudinaryUploadResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  }

  /**
   * Upload multiple images
   * @param files - Array of image files
   * @param options - Upload options
   * @param onProgress - Progress callback
   * @returns Promise with array of upload responses
   */
  async uploadMultipleImages(
    files: File[],
    options: UploadOptions = {},
    onProgress?: (current: number, total: number) => void
  ): Promise<CloudinaryUploadResponse[]> {
    const results: CloudinaryUploadResponse[] = [];

    for (let i = 0; i < files.length; i++) {
      if (onProgress) {
        onProgress(i + 1, files.length);
      }

      try {
        const result = await this.uploadImage(files[i], options);
        results.push(result);
      } catch (error) {
        console.error(`Failed to upload ${files[i].name}:`, error);
        throw error;
      }
    }

    return results;
  }

  /**
   * Delete image from Cloudinary
   * Note: Requires backend API for security (public_id deletion needs API secret)
   * @param publicId - Cloudinary public_id of image to delete
   */
  async deleteImage(publicId: string): Promise<void> {
    // This requires backend API with Cloudinary API secret
    // Cannot be done directly from browser for security reasons
    console.warn(
      'Image deletion requires backend API. Public ID:',
      publicId
    );
    throw new Error(
      'Image deletion must be implemented in backend API for security'
    );
  }

  /**
   * Get optimized image URL with transformations
   * @param publicId - Cloudinary public_id
   * @param width - Target width
   * @param height - Target height
   * @param crop - Crop mode (fill, fit, scale, etc.)
   * @returns Optimized image URL
   */
  getOptimizedUrl(
    publicId: string,
    width?: number,
    height?: number,
    crop: string = 'fill'
  ): string {
    let transformation = 'q_auto,f_auto';

    if (width) {
      transformation += `,w_${width}`;
    }

    if (height) {
      transformation += `,h_${height}`;
    }

    if (width || height) {
      transformation += `,c_${crop}`;
    }

    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${transformation}/${publicId}`;
  }

  /**
   * Get thumbnail URL
   * @param publicId - Cloudinary public_id
   * @param size - Thumbnail size (default 200)
   * @returns Thumbnail URL
   */
  getThumbnailUrl(publicId: string, size: number = 200): string {
    return this.getOptimizedUrl(publicId, size, size, 'fill');
  }

  /**
   * Check if Cloudinary is configured
   * @returns true if credentials are set
   */
  isConfigured(): boolean {
    return Boolean(this.cloudName && this.uploadPreset);
  }

  /**
   * Get configuration status
   * @returns Configuration details
   */
  getConfigStatus(): {
    configured: boolean;
    cloudName: string | null;
    uploadPreset: string | null;
  } {
    return {
      configured: this.isConfigured(),
      cloudName: this.cloudName || null,
      uploadPreset: this.uploadPreset || null,
    };
  }
}

// Export singleton instance
export const cloudinaryService = new CloudinaryService();

// Export types
export type { CloudinaryUploadResponse, UploadOptions };
