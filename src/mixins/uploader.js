// import { lStorage } from "@/utils/storage.js";
import { Toast } from "vant";
import EXIF from 'exif-js' // reading EXIF meta data from image files.
export default {
    data () {
        return {
            imgFile: {}, // 图片信息
            resolve: ''
        }
    },
    methods: {
        fileUploader (file) {
            return new Promise((resolve, reject) => {
                this.resolve = resolve
                this.imgFile = file
                console.log('file', file)

                const imgCompassMinSize = 100 * 1024 // 超过 200k 就压缩

                // 封装好的函数
                const reader = new FileReader()
                // file转dataUrl是个异步函数，要将代码写在回调里
                reader.onload = (e) => {
                    // console.dir(e)
                    const result = e.target.result
                    
                    let self = this
                    // 	获取图像的旋转方向数据
                    EXIF.getData(file, function() {
                        EXIF.getAllTags(this);
                        let orientation = EXIF.getTag(this, 'Orientation');
                        console.log('read-orientation', orientation)

                        if (file.size < imgCompassMinSize) {
                            self.compress(result, self.processData, orientation, false) // 图片不压缩
                        } else {
                            self.compress(result, self.processData, orientation) // 图片压缩
                        }
                    });
                }
                reader.readAsDataURL(file)
            })
        },

        // 使用canvas绘制图片并压缩
        compress (dataURL, callback, orientation = 1, shouldCompress = true) {
            const img = new window.Image()
            img.src = dataURL
            img.onload = () => {
                let compressedURL = this.compressedDataUrl(img, orientation, shouldCompress)
                callback(compressedURL)
            }
        },

        compressedDataUrl (img, orientation, shouldCompress) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            // console.log('img.width', img.width)
            // console.log('img.height', img.height)
            
            canvas.width = img.width > 1200 ? 1200 : img.width
			let rate = canvas.width === img.width ? 1 : img.width / 1200
			canvas.height = img.height / rate
            // console.log('canvas.width', canvas.width)
            // console.log('canvas.height', canvas.height)

            // 处理ios拍照图片旋转
            if(!!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
                // 判断图片方向，重置 canvas 大小，确定旋转角度，iphone 默认的是 home 键在右方的横屏拍摄方式
                console.log('orientation', orientation)
                switch (orientation) {
                    // 1 不需要旋转
                    case 1: {
                        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
                        break;
                    }
                    // iphone 横屏拍摄，此时 home 键在左侧 旋转180度
                    case 3: {
                        // ctx.clearRect(0, 0, img.width, img.height);
                        ctx.translate(0, 0);
                        ctx.rotate(Math.PI);
                        ctx.drawImage(img, 0, 0, img.width, img.height, -canvas.width, -canvas.height, canvas.width, canvas.height);
                        break;
                    }
                    // iphone 竖屏拍摄，此时 home 键在下方(正常拿手机的方向) 旋转90度
                    case 6: {
                        canvas.height = img.width
                        canvas.width = img.height
                        ctx.translate(0, 0);
                        ctx.rotate(90 * Math.PI / 180);
                        ctx.drawImage(img, 0, 0, img.width, img.height, 0, -img.height, img.width, img.height);
                        break;
                    }
                    // iphone 竖屏拍摄，此时 home 键在上方 旋转270度
                    case 8: {
                        canvas.height = img.width
                        canvas.width = img.height
                        ctx.translate(0, 0);
                        ctx.rotate(-90 * Math.PI / 180);
                        ctx.drawImage(img, 0, 0, img.width, img.height, -img.width, 0, img.width, img.height);
                        break;
                    }
                    default: {
                        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
                        break;
                    }
                }
            } else {
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height)
            }

            if (shouldCompress) {
                return canvas.toDataURL('image/jpeg', 0.8)
            } else {
                return canvas.toDataURL('image/jpeg', 1)
            }
        },

        processData (dataUrl) {
            // console.log('dataUrl', dataUrl)
            // 这里使用二进制方式处理dataUrl
            const binaryString = window.atob(dataUrl.split(',')[1])
            const arrayBuffer = new ArrayBuffer(binaryString.length)
            const intArray = new Uint8Array(arrayBuffer)
    
            for (let i = 0, j = binaryString.length; i < j; i++) {
                intArray[i] = binaryString.charCodeAt(i)
            }
    
            const data = [intArray]
    
            let blob
    
            try {
                blob = new Blob(data, { type: this.imgFile.type })
            } catch (error) {
                window.BlobBuilder = window.BlobBuilder ||
                    window.WebKitBlobBuilder ||
                    window.MozBlobBuilder ||
                    window.MSBlobBuilder
                if (error.name === 'TypeError' && window.BlobBuilder) {
                    const builder = new BlobBuilder() // eslint-disable-line
                    builder.append(arrayBuffer)
                    blob = builder.getBlob(this.imgFile.type)
                } else {
                    // Toast.error("版本过低，不支持上传图片", 2000, undefined, false);
                    throw new Error('版本过低，不支持上传图片')
                }
            }
    
            // // blob 转file
            // const fileOfBlob = new File([blob], this.imgFile.name)
            // // 压缩后大小
            // console.log('fileOfBlob', fileOfBlob)

            //当前时间戳+6位随机串
            let fileName = new Date().getTime() + '.png';
            blob.lastModifiedDate = new Date();
            blob.name = fileName;

            let formData = this.setFormData({
                type: this.imgFile.type,
                size: blob.size,
                name: this.imgFile.name,
                lastModifiedDate: this.imgFile.lastModifiedDate,
                file: blob
            })

            this.uploadImg(formData)
        },

        setFormData (file) {
            const formData = new FormData()
            // type
            formData.append('type', file.type)
            // size
            formData.append('size', file.size)
            // name
            formData.append('name', file.name)
            // lastModifiedDate
            formData.append('lastModifiedDate', file.lastModifiedDate)
            // append 文件
            formData.append('file', file.file)
            return formData
        },

        uploadImg (formData) {
            this.$api.storageServiceUpload(formData).then(res => {
                console.log('res', res)
                if (res.body[0]) {
                    this.resolve(res)
                } else {
                    // 解决压缩后上传失败问题
                    let formDataCopy = this.setFormData({
                        type: this.imgFile.type,
                        size: this.imgFile.size,
                        name: this.imgFile.name,
                        lastModifiedDate: this.imgFile.lastModifiedDate,
                        file: this.imgFile
                    })
                    console.log('formDataCopy', formDataCopy)
                    this.$api.storageServiceUpload(formDataCopy).then(res1 => {
                        if (res1.body[0]) {
                            this.resolve(res1)
                        } else {
                            Toast({
                                message: '上传失败',
                                position: "bottom"
                            });
                        }
                    })
                }
            })
        }
    }
}
