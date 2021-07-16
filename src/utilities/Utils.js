/********* UserInfo component functions BEGIN *********/

export function BioSuccess() {
    const { message } = require("antd");
    message.success("Successfully changed bio", 1);
}

export function BioEditVisibility(targetArray, visible, setVisible) {
    if(!visible) {
        targetArray.forEach((targetRef) => {
            if(targetRef.current.classList !== undefined) {
                targetRef.current.classList.remove("not-visible");
                targetRef.current.classList.remove("fade-out");
                targetRef.current.classList.add("visible");
            }
            else {
                targetRef.current.resizableTextArea.textArea.classList.remove("not-visible");
                targetRef.current.resizableTextArea.textArea.classList.remove("fade-out");
                targetRef.current.resizableTextArea.textArea.classList.add("visible");
            }
           
        })
        setVisible(true);
    }

    if(visible) {
        targetArray.forEach((targetRef) => {
            if(targetRef.current.classList !== undefined) {
                targetRef.current.classList.remove("visible");
                targetRef.current.classList.add("not-visible");
                targetRef.current.classList.add("fade-out");
            }
            else {
                targetRef.current.resizableTextArea.textArea.classList.remove("visible");
                targetRef.current.resizableTextArea.textArea.classList.add("not-visible");
                targetRef.current.resizableTextArea.textArea.classList.add("fade-out");
            }
            
        })
        setVisible(false);
    }
}

export function ChangeEditValue(e, setInputValFn, setCharValueFn, CHAR_LIMIT) {

    if(e.target.value.length <= CHAR_LIMIT) {
        setInputValFn(e.target.value);
        setCharValueFn(CHAR_LIMIT - e.target.value.length);
    }

    if(e.target.value.length > CHAR_LIMIT) {
        setInputValFn(e.target.value.slice(0,100));
        setCharValueFn(0);
    }
}

export function ApplyNewBio(editVal, setEditValFn, bioVal, setBioValFn, bioArray, setVisibileFn, setCharFn, CHAR_LIMIT) {
    setBioValFn(editVal);
    setEditValFn("");
    BioEditVisibility(bioArray, true, setVisibileFn);
    setCharFn(CHAR_LIMIT);
    BioSuccess();
}

export function ClearEditField(val, setValFn, setCharFn, CHAR_LIMIT) {
    if(val !== "") {
        setValFn("");
        setCharFn(CHAR_LIMIT);
    }

    return val;
}

export function KeepButtonsVisible(xRef, checkRef) {
    const refList = [xRef, checkRef];
    refList.forEach((targetRef) => {
        targetRef.current.classList.remove("not-visible");
        targetRef.current.classList.add("visible");
    })
}


export function ChangeImage(imageFile, setImageFn, setImageExistsFn) {
    const { message } = require("antd");
    
    if(!imageFile) {
        message.error(`${imageFile.name} file upload failed.`);
        return;
    }

    // Image isn't actually uploaded, this code ensures message is only displayed once
    if(imageFile.file.status === "error") {
        let url = URL.createObjectURL(imageFile.file.originFileObj);
        setImageFn(url);
        setImageExistsFn(true);
        message.success("Succesfully added NEW profile picture!");
        return;
    }
}

export function BeforeUpload(file) {
    const { message } = require("antd");
    console.log(`Before Upload File: ${file}`);

    const isJpgOrPng = file.type === "image/jpeg"|| file.type === "image/png";
    if(!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLess2M = file.size / 1024 / 1024 < 2;
    if(!isLess2M) {
        message.error("Image must be smaller than 2MB!");
    }

    return isJpgOrPng && isLess2M;
}

export function RemoveImage(setImageFn, setImageExistsFn) {
    const { message } = require("antd");
    message.success("Successfully removed your profile picture!");
    setImageFn(null);
    setImageExistsFn(false);
}

/********* UserInfo component functions ENDS *********/

/********* MusicInterests component functions BEGINS *********/

export function RemoveItem(list, index, setList) {
    const newList = list.filter((item, i) => {
        return i !== index;
    })
    setList(newList);
}

/********* MusicInterests component functions ENDS *********/