import BlogCard from './components/blogcard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-col items-center">
        <BlogCard title="Blog Post 1" description="This is a description for the first blog post." />
        <BlogCard title="Blog Post 2" description="This is a description for the second blog post." />
        <BlogCard title="Blog Post 3" description="This is a description for the third blog post." />
        <BlogCard title="Blog Post 4" description="This is a description for the fourth blog post." />
        <BlogCard title="Blog Post 5" description="This is a description for the fifth blog post." />
      </div>
    </>
  );
}

export default App;
