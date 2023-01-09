const path = require('path')

const uploadSingleFile = async (fileObject) => {
    // Lấy đường dẫn thư mục lưu file
    let uploadPath = path.resolve(__dirname, '../public/images/upload')
    // Lấy định dạng file png, gif ...
    let exName = path.extname(fileObject.name)
    // Lấy tên file upload
    let baseName = path.basename(fileObject.name, exName)
    // Tạo tên file từ tên file gốc nối với thời gian tạo file
    let finalName = `${baseName}-${Date.now()}${exName}`
    // Tạo đường dẫn lưu file theo tên file đã lấy
    let finalPath = `${uploadPath}/${finalName}`
    try {
        await fileObject.mv(finalPath)
        return {
            status: 'success',
            path: finalName,
            error: null,
        }
    } catch (error) {
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(error),
        }
    }
}

const uploadMultipleFiles = async (filesArr) => {
    try {
        let uploadPath = path.resolve(__dirname, "../public/images/upload");

        let resultArr = [];
        let countSuccess = 0;
        for (let i = 0; i < filesArr.length; i++) {
            console.log("check i = ", i)
            //get image extension
            let extName = path.extname(filesArr[i].name);

            //get image's name (without extension)
            let baseName = path.basename(filesArr[i].name, extName);

            //create final path: eg: /upload/your-image.png
            let finalName = `${baseName}-${Date.now()}${extName}`
            let finalPath = `${uploadPath}/${finalName}`;

            try {
                await filesArr[i].mv(finalPath);
                resultArr.push({
                    status: 'success',
                    path: finalName,
                    fileName: filesArr[i].name,
                    error: null
                })
                countSuccess++;
            } catch (err) {
                resultArr.push({
                    status: 'failed',
                    path: null,
                    fileName: filesArr[i].name,
                    error: JSON.stringify(err)
                })
            }
        }

        return {
            countSuccess: countSuccess,
            detail: resultArr
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    uploadMultipleFiles,
    uploadSingleFile,
}