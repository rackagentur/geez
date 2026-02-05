<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2575.4">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
  </style>
</head>
<body>
<p class="p1">// Mobile menu toggle</p>
<p class="p1">document.addEventListener('DOMContentLoaded', () =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">  </span>const menuToggle = document.querySelector('.mobile-menu-toggle');</p>
<p class="p1"><span class="Apple-converted-space">  </span>const navMenu = document.querySelector('.nav-menu');</p>
<p class="p2"><span class="Apple-converted-space">  </span></p>
<p class="p1"><span class="Apple-converted-space">  </span>if (menuToggle &amp;&amp; navMenu) {</p>
<p class="p1"><span class="Apple-converted-space">    </span>menuToggle.addEventListener('click', () =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">      </span>navMenu.classList.toggle('active');</p>
<p class="p1"><span class="Apple-converted-space">    </span>});</p>
<p class="p1"><span class="Apple-converted-space">  </span>}</p>
<p class="p2"><span class="Apple-converted-space">  </span></p>
<p class="p1"><span class="Apple-converted-space">  </span>// Add active class to current navigation item</p>
<p class="p1"><span class="Apple-converted-space">  </span>const navLinks = document.querySelectorAll('.nav-menu a');</p>
<p class="p1"><span class="Apple-converted-space">  </span>navLinks.forEach(link =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (link.href === window.location.href) {</p>
<p class="p1"><span class="Apple-converted-space">      </span>link.classList.add('active');</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>});</p>
<p class="p1">});</p>
<p class="p2"><br></p>
<p class="p1">// Intersection Observer for animations</p>
<p class="p1">const observer = new IntersectionObserver((entries) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">  </span>entries.forEach(entry =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">    </span>if (entry.isIntersecting) {</p>
<p class="p1"><span class="Apple-converted-space">      </span>entry.target.style.opacity = 1;</p>
<p class="p1"><span class="Apple-converted-space">      </span>observer.unobserve(entry.target);</p>
<p class="p1"><span class="Apple-converted-space">    </span>}</p>
<p class="p1"><span class="Apple-converted-space">  </span>});</p>
<p class="p1">}, { threshold: 0.1 });</p>
<p class="p2"><br></p>
<p class="p1">document.querySelectorAll('.fade-in-up').forEach(el =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">  </span>observer.observe(el);</p>
<p class="p1">});</p>
<p class="p2"><br></p>
<p class="p1">// Smooth scrolling for anchor links</p>
<p class="p1">document.querySelectorAll('a[href^="#"]').forEach(anchor =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">  </span>anchor.addEventListener('click', (e) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">    </span>e.preventDefault();</p>
<p class="p1"><span class="Apple-converted-space">    </span>document.querySelector(anchor.getAttribute('href')).scrollIntoView({</p>
<p class="p1"><span class="Apple-converted-space">      </span>behavior: 'smooth'</p>
<p class="p1"><span class="Apple-converted-space">    </span>});</p>
<p class="p1"><span class="Apple-converted-space">  </span>});</p>
<p class="p1">});</p>
<p class="p2"><br></p>
<p class="p1">// Form validation and submission</p>
<p class="p1">document.querySelectorAll('form').forEach(form =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">  </span>form.addEventListener('submit', (e) =&gt; {</p>
<p class="p1"><span class="Apple-converted-space">    </span>e.preventDefault();</p>
<p class="p1"><span class="Apple-converted-space">    </span>alert('Form submitted successfully!');</p>
<p class="p1"><span class="Apple-converted-space">    </span>form.reset();</p>
<p class="p1"><span class="Apple-converted-space">  </span>});</p>
<p class="p1">});</p>
</body>
</html>
