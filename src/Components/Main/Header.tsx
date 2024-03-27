import './Header.css'

function Header() {
  return (
    <>
      <div className="logo d-flex justify-content-between pb-3 ">
        <div className="navbar-left d-flex">
        <img className="saketa pe-4" src=".\src\assets\saketa.jpg"></img>
        <div className="heading ">
          <h2 className="blue-text" >Employee Directory</h2>
          <h6>The Ultimate People Directory Experience</h6>
        </div>
        </div>


        <div className="welcome-message d-flex align-items-end ">
            <h3 className="blue-text" >Welcome,</h3>
            <h3>Andrew Philips</h3>
            <img className="cat-img ps-3" src=".\src\assets\cat.png"></img>

        </div>
        
      </div>
    </>
  );
}

export default Header;
