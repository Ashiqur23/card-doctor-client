import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Check = () => {
  const service = useLoaderData();
  const { title, _id, price, img } = service;
  const { user } = useContext(AuthContext);
  // console.log(service);
  // console.log(user?.email);
  const handleBookService = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const date = form.data.value;
    const email = user?.email;
    const Booking = {
      CustomerName: name,
      email,
      img,
      date,
      Service: title,
      service_id: _id,
      price: price,
    };
    fetch(`https://car-doctor-server-sand-six.vercel.app/bookings`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(Booking),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.insertedId) {
          alert("service booking successfully");
          form.reset();
        }
      });
  };
  return (
    <div>
      <h2 className="text-center text-3xl">Book Service:{title}</h2>
      <div className="card-body">
        <form onSubmit={handleBookService}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                name="name"
                defaultChecked={user?.name}
                type="text"
                placeholder="name"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">date</span>
              </label>
              <input type="date" name="data" className="input input-bordered" />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                defaultValue={user?.email}
                type="text"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Deo amount</span>
              </label>
              <input
                defaultValue={price}
                name="amount"
                type="text"
                placeholder="Amount"
                className="input input-bordered"
              />
            </div>
          </div>
          <div className="form-control mt-6">
            <input
              className="btn btn-primary btn-block"
              type="submit"
              value="Order Confirm"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Check;
