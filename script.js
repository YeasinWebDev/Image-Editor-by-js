const container = document.querySelector(".container"),
    fileInput = document.querySelector(".file-input"),
    filterOptions = document.querySelectorAll(".filter button"),
    ChooseImagebtn = document.querySelector(".choose-img"),
    filterName = document.querySelector(".filter-info .name"),
    filterSlider = document.querySelector(".silder input"),
    filterValue = document.querySelector(".silder .value"),
    rotateOption = document.querySelectorAll(".rotate button"),
    resetFilterBtn = document.querySelector(".reset-filter"),
    downloadImg = document.querySelector(".save-img"),
    cropBtn= document.querySelector("#Crop"),
    doneBtn =document.querySelector("#done-btn"),
    previewImg = document.querySelector(".preview-img img");


let brigthness = 100, saturation = 100, inversion = 0, grayscale = 0; //filter section
let rotate = 0, flipHorizontal = 1, filpVertical = 1; //rotate section

const applyFilter = () => {
    previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${filpVertical})`;
    previewImg.style.filter = `brightness(${brigthness}%)  saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}

const loadImage = () => {
    let file = fileInput.files[0]
    if (!file) return
    previewImg.src = URL.createObjectURL(file) //passing file url as preview img src 

    previewImg.addEventListener("load", () => {
        resetFilterBtn.click();
        container.classList.remove("disable")
    })

    filterOptions.forEach(option => {
        option.addEventListener("click", () => {
            document.querySelector(".filter .active").classList.remove("active")
            option.classList.add("active")
            filterName.innerText = option.innerText;

            if (option.id === "Brightness") {
                filterSlider.max = "200"
                filterSlider.value = brigthness;
                filterValue.innerHTML = `${brigthness}%`
            } else if (option.id === "Saturation") {
                filterSlider.max = "200"
                filterSlider.value = saturation;
                filterValue.innerHTML = `${saturation}%`
            } else if (option.id === "Inversion") {
                filterSlider.max = "100"
                filterSlider.value = inversion;
                filterValue.innerHTML = `${inversion}%`
            } else if (option.id === "Grayscale") {
                filterSlider.max = "100"
                filterSlider.value = grayscale;
                filterValue.innerHTML = `${grayscale}%`
            }
        })
    })
}


const updateFilter = () => {
    filterValue.innerText = ` ${filterSlider.value}%`
    const selectedFilter = document.querySelector(".filter .active");

    if (selectedFilter.id === "Brightness") {
        brigthness = filterSlider.value
    } else if (selectedFilter.id === "Saturation") {
        saturation = filterSlider.value
    } else if (selectedFilter.id === "Inversion") {
        inversion = filterSlider.value
    } else if (selectedFilter.id === "Grayscale") {
        grayscale = filterSlider.value
    }

    applyFilter()
}

rotateOption.forEach(option => {
    option.addEventListener("click", () => {
        if (option.id === "left") {
            rotate -= 90
        } else if (option.id === 'right') {
            rotate += 90
        } else if (option.id === "vertical") {
            filpVertical = filpVertical === 1 ? -1 : 1
        } else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1
        }
         applyFilter();
        
    })
})

const resetFilter = () => {
    
    brigthness = 100, saturation = 100, inversion = 0, grayscale = 0;
    rotate = 0, flipHorizontal = 1, filpVertical = 1;

    filterOptions[0].click() // clicking brightness btn, so the brightness selsected by default
    applyFilter()
}

const downloadImage = () =>{
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = previewImg.naturalWidth;
    canvas.height = previewImg.naturalHeight;
    
    ctx.filter = `brightness(${brigthness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if(rotate !== 0) {
        ctx.rotate(rotate * Math.PI / 180);
    }
    ctx.scale(flipHorizontal, filpVertical);
    ctx.drawImage(previewImg, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
    
    document.body.removeChild(link);
}



downloadImg.addEventListener("click", downloadImage)
resetFilterBtn.addEventListener("click", resetFilter)
fileInput.addEventListener("change", loadImage)
filterSlider.addEventListener("input", updateFilter)
ChooseImagebtn.addEventListener("click", () => fileInput.click())