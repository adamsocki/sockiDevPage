const projectData = {
    1: {
      title: 'Project 1',
      description: 'This is an example of Project 1.',
      codeExample: `
  function exampleOne() {
    console.log("Hello, this is Project 1!");
  }`,
    },
    2: {
      title: 'Project 2',
      description: 'This is an example of Project 2.',
      codeExample: `
  function exampleTwo() {
    console.log("Hello, this is Project 2!");
  }`,
    },
  };
  
  function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
  
    if (projectData.hasOwnProperty(projectId)) {
      const project = projectData[projectId];
      document.getElementById('project-title').textContent = project.title;
  
      const projectContent = document.getElementById('project-content');
      projectContent.innerHTML = `
        <p>${project.description}</p>
        <pre><code>${project.codeExample}</code></pre>
      `;
    } else {
      document.getElementById('project-content').innerHTML = `
        <p>Sorry, the requested project could not be found.</p>
      `;
    }
  }
  
  loadProjectDetails();
  