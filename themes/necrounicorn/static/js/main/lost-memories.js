document.addEventListener('DOMContentLoaded', function () {
  const lost_memories = document.querySelector('.lost_memories');
  const cancel = document.querySelector('.cancel');
  const open = document.querySelector('.open');
  // Get value from localStorage when open the page
  const lS = localStorage.getItem('first-visit');
  // Add button 'click' event
  cancel.addEventListener('click', () => {
    // Set value to the localStorage
    localStorage.setItem('first-visit', false);
    // hide DOM element
    lost_memories.style.display = 'none';
  });
  open.addEventListener('click', () => {
    // Set value to the localStorage
    localStorage.setItem('first-visit', true);
    // show DOM element
    lost_memories.style.display = 'block';
  });
  // This does not check on the first visit to the page
  // If localStorage have value, hide DOM element
  if (lS === 'false') {
    lost_memories.style.display = 'none';
  } else {
    lost_memories.style.display = 'block';
  }
});