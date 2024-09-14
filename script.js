const heads = [
    'images/h1.png', 'images/h2.png', 'images/h3.png', 'images/h4.png', 'images/h5.png',
    'images/h6.png', 'images/h7.png', 'images/h9.png', 'images/h10.png',
    'images/h11.png', 'images/h12.png', 'images/h13.png', 'images/h14.png', 'images/h15.png',
    'images/h16.png', 'images/h17.png', 'images/h18.png', 'images/h19.png', 'images/h20.png',
    'images/h21.png', 'images/h23.png', 'images/h24.png', 'images/h25.png',
    'images/h26.png', 'images/h27.png', 'images/h28.png', 'images/h29.png', 'images/h30.png',
    'images/h31.png', 'images/h32.png', 'images/h33.png', 'images/h34.png', 'images/h35.png'
];

const bodies = [
    'images/b1.png', 'images/b2.png', 'images/b3.png', 'images/b4.png', 'images/b5.png',
    'images/b6.png', 'images/b7.png', 'images/b8.png', 'images/b9.png', 'images/b10.png',
    'images/b12.png', 'images/b13.png', 'images/b14.png', 'images/b15.png',
    'images/b16.png', 'images/b17.png', 'images/b18.png', 'images/b20.png',
    'images/b21.png', 'images/b22.png', 'images/b23.png', 'images/b24.png', 'images/b25.png',
    'images/b26.png', 'images/b27.png', 'images/b28.png', 'images/b29.png', 'images/b30.png',
    'images/b31.png'
];

const shoes = [
    'images/shoes1.png', 'images/shoes2.png', 'images/shoes3.png', 
    'images/shoes4.png', 'images/shoes5.png', 'images/shoes6.png', 
    'images/shoes7.png', 'images/shoes8.png', 'images/shoes9.png', 
    'images/shoes10.png', 'images/shoes11.png', 'images/shoes12.png', 
    'images/shoes13.png', 'images/shoes14.png', 'images/shoes15.png', 
    'images/shoes16.png', 'images/shoes17.png'
];

const backgrounds = [
    'backgrounds/bg1.png', 'backgrounds/bg2.png', 'backgrounds/bg3.png',
    'backgrounds/bg4.png', 'backgrounds/bg5.png', 'backgrounds/bg6.png',
    'backgrounds/bg7.png', 'backgrounds/bg8.png', 'backgrounds/bg9.png',
    'backgrounds/bg10.png', 'backgrounds/bg11.png', 'backgrounds/bg12.png',
    'backgrounds/bg13.png', 'backgrounds/bg14.png', 'backgrounds/bg15.png',
    'backgrounds/bg16.png', 'backgrounds/bg17.png', 'backgrounds/bg18.png',
    'backgrounds/bg19.png', 'backgrounds/bg20.png', 'backgrounds/bg21.png',
    'backgrounds/bg22.png', 'backgrounds/bg23.png'
];

const optionsState = {
    'background-options': { currentIndex: 0, items: backgrounds },
    'body-options': { currentIndex: 0, items: bodies },
    'head-options': { currentIndex: 0, items: heads },
    'shoes-options': { currentIndex: 0, items: shoes }
};

window.onload = function() {
    createOptions('background-options');
    createOptions('head-options');
    createOptions('body-options');
    createOptions('shoes-options');

    document.getElementById('save-button').addEventListener('click', saveImage);

    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', function() {
            const direction = this.classList.contains('left') ? -1 : 1;
            navigate(direction, this.dataset.target);
        });
    });
};

function createOptions(containerId) {
    const container = document.getElementById(containerId);
    const state = optionsState[containerId];
    container.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const index = (state.currentIndex + i) % state.items.length;
        const img = document.createElement('img');
        img.src = state.items[index];
        img.onclick = () => selectItem(state.items[index], containerId.split('-')[0]);
        container.appendChild(img);
    }
}

function selectItem(src, targetId) {
    const img = document.getElementById(targetId);
    img.src = src;
    img.style.opacity = 1;
    
    const itemNumber = parseInt(src.match(/(\d+)/)[1]);
    
    if (targetId === 'head') {
        if (itemNumber >= 27 && itemNumber <= 35) {
            img.style.top = '82px';
            img.style.left = '15px';
        } else if (itemNumber >= 20 && itemNumber <= 26) {
            img.style.top = '155px';
            img.style.left = '0px';
        } else if (itemNumber >= 11 && itemNumber <= 19) {
            img.style.top = '79px';
            img.style.left = '13px';
        } else {
            img.style.top = '117px';
            img.style.left = '-19px';
        }
        img.style.zIndex = '2';
        makeDraggable(img);
    } else if (targetId === 'body') {
        if (itemNumber >= 12 && itemNumber <= 31) {
            img.style.top = '79px';
            img.style.left = '13px';
        } else {
            img.style.top = '115px';
            img.style.left = '-28px';
        }
        img.style.zIndex = '1';
    } else if (targetId === 'shoes') {
        if (itemNumber >= 8 && itemNumber <= 16) {
            img.style.top = '251px';
            img.style.left = '3px';
        } else if (itemNumber >= 14 && itemNumber <= 22) {
            img.style.top = '279px';
            img.style.left = '7px';
        } else {
            img.style.top = '103px';
            img.style.left = '-20px';
        }
        img.style.zIndex = '3';
        makeDraggable(img);
    } else if (targetId === 'background') {
        img.style.zIndex = '0';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.style.position = 'absolute';
        img.style.top = '0';
        img.style.left = '0';
    }
}

function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        console.log(`Final position - Top: ${element.style.top}, Left: ${element.style.left}`);
    }
}

function navigate(direction, targetId) {
    const state = optionsState[targetId];
    state.currentIndex = (state.currentIndex + direction + state.items.length) % state.items.length;
    createOptions(targetId);
}

function saveImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 800;

    // Draw background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Function to draw image and return a promise
    function drawImageOnCanvas(img) {
        return new Promise((resolve, reject) => {
            if (img.complete) {
                ctx.drawImage(img, img.offsetLeft, img.offsetTop, img.width, img.height);
                resolve();
            } else {
                img.onload = () => {
                    ctx.drawImage(img, img.offsetLeft, img.offsetTop, img.width, img.height);
                    resolve();
                };
                img.onerror = reject;
            }
        });
    }

    // Draw all images
    const body = document.getElementById('body');
    const head = document.getElementById('head');
    const shoes = document.getElementById('shoes');

    Promise.all([
        drawImageOnCanvas(head),
        drawImageOnCanvas(body),
        drawImageOnCanvas(shoes)
    ]).then(() => {
        // Create download link
        const link = document.createElement('a');
        link.download = 'profile-picture.png';
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch(error => {
        console.error('Error saving image:', error);
        alert('There was an error saving the image. Please check the console for details.');
    });
}