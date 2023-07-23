<template>
    <div>
      <main>
        <div class="home-container">
          <h3 class="home-title">WELCOME TO</h3>
          <h4 class="home-title">Website  Data Mahasiswa</h4>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'YourComponentName',
  }
  </script>
  
  <style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background-color: #f1f1f1;
  }
  
  header {
    background-color: #333;
    padding: 1rem;
  }
  
  nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  
  nav ul li {
    margin-right: 1rem;
  }
  
  nav ul li a {
    text-decoration: none;
    color: #fff;
  }
  
  main {
    padding: 2rem;
    text-align: center;
  }
  
  .home-container {
    padding: 20% 2rem;
    text-align: center;
    background-image: url('https://img.freepik.com/free-vector/happy-cute-little-kid-home-school-with-computer-laptop-connect-internet-study-e-learning-course_97632-3114.jpg?size=626&ext=jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  
  .home-title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: #000000;
  }
  
  .home-description {
    font-size: 1rem;
    color: #000000;
    margin-bottom: 2rem;
  }
  
  footer {
    background-color: #333;
    color: #fff;
    padding: 1rem;
    text-align: center;
  }
  </style>
  