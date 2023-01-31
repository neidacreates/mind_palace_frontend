const errorPage = () => {
  return (
    <div className="container">
      <h1 className="text-center">Woof! That's one page I can't fetch! </h1>
      <img className="img-fluid" src="/puppy.jpg" alt="Puppy" />
      <p className="text-center">
        Photo by{" "}
        <a href="https://unsplash.com/@oddityandgrace?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          hannah grace
        </a>{" "}
        on{" "}
        <a href="https://unsplash.com/images/animals/puppies?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
          Unsplash
        </a>
      </p>
    </div>
  );
};

export default errorPage;
