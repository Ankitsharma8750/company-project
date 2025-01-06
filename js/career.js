
document.querySelectorAll('.apply-btn').forEach(button => {
  button.addEventListener('click', () => {
    const job = button.getAttribute('data-job');
    document.getElementById('job').value = job;
    document.getElementById('application-form').scrollIntoView({ behavior: 'smooth' });
  });
});
