# CV - CHARIS FILIS - USED CLAUDE TO MAKE IT
cv:
  name: Charis Filis
  headline: Electrical & Computer Engineer | AI/ML Engineer | Full-Stack Developer
  location: Naoussa / Thessaloniki, Central Macedonia, Greece
  email: harry.filis@protonmail.com
  phone: "+306972434854"
  website: https://charisfilis.github.io
  social_networks:
    - network: LinkedIn
      username: harry-filis
    - network: GitHub
      username: charisfilis
  sections:
    summary:
      - As a graduate of the Polytechnic School of Aristotle University of Thessaloniki with a
        degree in Electrical Engineering and Computer Engineering, I have a multidisciplinary
        background combining software engineering with artificial intelligence and deep learning.
        My experience spans full-stack development, distributed systems, and cloud deployment,
        with strong skills in Python, JavaScript, C/C++, SQL, and tools such as Docker, Git, and
        MongoDB. I have contributed to AI projects in computer vision, 3D graphics, and data
        analysis, while gaining experience in web and systems development through academic,
        personal, and professional projects. Motivated by continuous learning and a strong
        interest in scalable, real-world software solutions, I am eager to contribute to
        international, cross-functional teams driving innovation across a broad range of
        technology domains.

    education:
      - institution: Aristotle University of Thessaloniki
        area: Electrical Engineering & Computer Engineering
        degree: Diploma (MEng)
        start_date: 2017-10
        end_date: 2023-12
        location: Thessaloniki, Greece
        highlights:
          - 'Grade: 7.5/10'
          - 'Thesis (Grade 10/10): *3D Neural Surface Representation from Images Using Deep
            Neural Networks with Emphasis on High-Frequency Encoding of 3D Content*
            ([ikee.lib.auth.gr](https://ikee.lib.auth.gr))'
          - 'Courses: Software Engineering, Computer Architecture, Deep Neural Networks, Data
            Analysis, Digital Image/Video Processing, Biomedical Engineering, Parallel &
            Distributed Systems, Operating Systems, Robotics, Embedded Systems, Databases,
            Cybersecurity'

      - institution: Aristotle University of Thessaloniki
        area: Communications Networks & Cybersecurity
        degree: M.Sc.
        start_date: 2024-10
        end_date: 2025-10
        location: Thessaloniki, Greece
        highlights:
          - 'Status: Studies suspended (Oct 2024 – Oct 2025)'

    experience:
      - company: Loceye I.K.E.
        position: Software / ML / Networks Engineering Intern
        start_date: 2021-10
        end_date: 2022-02
        location: Thessaloniki, Greece
        highlights:
          - Redesigned Deep Learning models for eye-tracking and facial feature detection,
            improving inference accuracy
          - Provided network engineering services and configured IT communications
            infrastructure
          - Maintained the company's application server software stack (Django Framework,
            MongoDB)
          - Containerized the application using Docker for reliable and reproducible deployments

      - company: PC Service Naoussa
        position: IT Technical Support Technician
        start_date: 2024-11
        end_date: 2025-09
        location: Naoussa, Greece
        highlights:
          - Assembled custom PC builds and diagnosed and repaired faulty motherboards, hard
            drives, and graphics cards
          - Designed custom NAS and home-server solutions tailored to client needs
          - Performed data recovery operations from damaged storage media

    projects:
      - name: '[3D Neural Surface Representation with High-Frequency Encoding](https://github.com/charisfilis/HashModNFFBanks-IDR)'
        date: 2023
        summary: Diploma thesis project — reconstructing textured 3D objects from a sparse set of images
        highlights:
          - Developed deep learning code in Python capable of accurately reconstructing
            textured 3D objects using only a small number of supervisory images
          - 'Tools: PyTorch, CUDA, Sphere Tracing, 3D Rendering principles'

      - name: '[GitHub Repositories](https://github.com/charisfilis)'
        summary: Collection of academic assignments and personal projects
        highlights:
          - Covers computational intelligence, computer graphics, neural networks, parallel and
            distributed systems, and more
          - 'Languages used: C, C++, Java, Python, MATLAB, JavaScript, Bash, MIPS Assembly'

    certifications:
      - bullet: '"Deep Learning and Computer Vision" — AIIA Lab, AUTH'
      - bullet: '"Node.js, Express, MongoDB & More: The Complete Bootcamp" — Jonas Schmedtmann
          (Udemy)'
      - bullet: '"Deep Learning: Advanced Computer Vision (GANs, SSD, +More!)" — Lazy Programmer
          Inc. (Udemy)'
      - bullet: '"Wireshark: Packet Analysis and Ethical Hacking: Core Skills" — David Bombal
          (Udemy) [In Progress]'

    conferences_and_workshops:
      - bullet: Computer Vision & Machine Learning Seminar (CVML) — AIIA Lab, AUTH (Aug 2022)
      - bullet: SMAuto Workshop | DSL in IoT — ISSEL Lab, AUTH (Jul 2023)
      - bullet: Locsys Workshop | No-Code IoT — ISSEL Lab, AUTH (Dec 2023)
      - bullet: Arduino Workshop for Beginners & Advanced — IEEE SB DUTh (Mar 2018, Apr 2019)
      - bullet: 11th & 12th Student Conference of Electrical & Computer Engineers, Thessaloniki
          (Apr 2019, Apr 2021)

    competitions:
      - bullet: '"Let''s Have a Hackathon" Programming Contest — Microsoft Student Partners
          Community (Dec 2018)'
      - bullet: BEST European Engineering Competition (Team Design) (Feb 2019)

    skills:
      - label: Programming Languages
        details: Python, C/C++, Shell Scripting, JavaScript, Java, SQL, MATLAB/Octave
      - label: Frameworks & Libraries
        details: PyTorch, OpenCV, CUDA, TensorFlow, Keras, Scikit-learn, Django, Flask, FastAPI,
          Node.js, Express, React.js
      - label: DevOps & Cloud
        details: Docker, Nginx, AWS, Google Cloud, Git
      - label: Databases
        details: PostgreSQL, MySQL, MongoDB
      - label: Embedded & Hardware
        details: Arduino, Raspberry Pi, STM32 Nucleo, OrCAD-CIS Capture
      - label: Languages
        details: Greek (Native), English (Proficient — C2)

    research_activities:
      - bullet: Participated in machine learning research (SVMs, Lasso Regression, RNNs,
          Unsupervised Learning, VAEs, GANs, Reinforcement Learning) and contributed to
          educational outreach by co-organizing workshops as a member of the IEEE Student
          Branch at AUTH (2018–2019)

design:
  theme: classic
  colors:
    name: rgb(0, 79, 144)
    section_titles: rgb(0, 79, 144)
    links: rgb(0, 79, 144)
    connections: rgb(0, 79, 144)
  typography:
    alignment: justified
  page:
    show_footer: true
    show_top_note: true
  header:
    connections:
      show_icons: false

locale:
  language: english

settings:
  render_command:
    output_folder: rendercv_output_en
    pdf_path: rendercv_output_en/Charis_Filis_CV_EN.pdf
    dont_generate_markdown: true
    dont_generate_html: true
    dont_generate_png: true
