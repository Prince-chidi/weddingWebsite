
const imgbbApiKey = '86890fba97336567aa0a7df1b5d5afdc'; 

const button = document.getElementById('shareMemories');

button.addEventListener('click', async () => {
  const file = await selectImageFile();
  if (!file) return;

  const alt = prompt('Add a description for the image:');
  if (!alt) {
    alert('Description is required!');
    return;
  }

  button.innerText = 'Uploading...';

  try {
    const imageUrl = await uploadToImgBB(file);
    await saveToServer(imageUrl, alt);
    alert('Image uploaded successfully!');
    window.location.reload();
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to upload the image.');
  } finally {
    button.innerText = 'Share in Our Memories';
  }
});

async function selectImageFile() {
  return new Promise(resolve => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => resolve(input.files[0]);
    input.click();
  });
}

async function uploadToImgBB(file) {
  const formData = new FormData();
  formData.append('image', file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();

  if (!data.success) {
    throw new Error('Failed to upload image to ImgBB');
  }

  return data.data.url;
}

async function saveToServer(url, alt) {
  const response = await fetch(`/upload-memory`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, alt }),
  });

  if (!response.ok) {
    throw new Error('Failed to save data to server');
  }
}

async function fetchGalleryImages() {
  const response = await fetch(`/memories`);
  if (!response.ok) {
    throw new Error('Failed to fetch memories');
  } else {
    const galleryImages = await response.json();
    console.log('Gallery Images:', galleryImages);


    class Gallery {
      constructor(container) {
        this.container = container;
        this.items = [];
      }
    
      addImages(images) {
        images.forEach((image, index) => {
          const item = this.createGalleryItem(image);
          this.items.push(item);
          this.container.appendChild(item);
    
          // Delayed animation for staggered effect
          setTimeout(() => {
            item.classList.add('fade-in');
          }, index * 100);
        });
      }
    
      createGalleryItem(image) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.category = image.category;
    
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = image.alt;
        img.loading = 'lazy';
    
        const overlay = document.createElement('div');
        overlay.className = 'gallery-item-overlay';
        overlay.innerHTML = `<span>${image.alt}</span>`;
    
        item.appendChild(img);
        item.appendChild(overlay);
        return item;
      }
    
      shuffle() {
        const shuffledItems = [...this.items].sort(() => Math.random() - 0.5);
        this.container.innerHTML = '';
        shuffledItems.forEach(item => {
          this.container.appendChild(item);
        });
        this.items = shuffledItems;
      }
    }
    
    // Initialize gallery
    const galleryContainer = document.getElementById('gallery');
    const gallery = new Gallery(galleryContainer);
    
    // Load all images at once
    gallery.addImages(galleryImages);
    
    // Handle load more button
    const loadMoreButton = document.getElementById('loadMore');
    if (loadMoreButton) {
      loadMoreButton.remove();
    }
    
    
    var shufflebtn = document.getElementById('shuffle');
    shufflebtn.addEventListener('click', () => {
     
        gallery.shuffle();
      
    });
    
  }
  




}

// Fetch all memories when the page loads
fetchGalleryImages();


