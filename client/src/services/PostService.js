import api from "../axios";

export class PostService {
    static zip(response) {
        if (response.status !== 200  && response.status !== 201) {
            throw new Error(response.message || 'Что-то пошло не так')
        }
        return response;
    }

    static async postUploadImage(image, token) {
        try {
            const formData = await new FormData();
            formData.append('image', image)
            const data_answer = await api.post(`/api/upload/image`, formData, {headers: {"Authorization" : token}});
            return await this.zip(data_answer);
        } catch (err) {
            throw new Error(err.message || 'Что-то пошло не так')
        }
    }

    static async postUploadVideo(file, token) {
        try {
            const formData = await new FormData();
            formData.append('file', file)
            const data_answer = await api.post(`/api/upload/video`, formData, {headers: {"Authorization" : token}});
            return await this.zip(data_answer);
        } catch (err) {
            throw new Error(err.message || 'Что-то пошло не так')
        }
    }
}
