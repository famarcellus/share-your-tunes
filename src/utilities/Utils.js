/********* UserInfo component functions BEGIN *********/

export function BioSuccess() {
    const antd = require("antd");
    const { message } = antd;
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

/********* UserInfo component functions ENDS *********/

/********* MusicInterests component functions BEGINS *********/

export function RemoveItem(list, index, setList) {
    const newList = list.filter((item, i) => {
        return i !== index;
    })
    setList(newList);
}

/********* MusicInterests component functions ENDS *********/