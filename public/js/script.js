document.querySelectorAll('.project').forEach((project) => {
    project.addEventListener('click', function () {
      const projectId = this.dataset.projectId;
      window.location.href = `project-details.html?id=${projectId}`;
    });
  });
  