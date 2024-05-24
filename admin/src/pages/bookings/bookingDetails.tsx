import Layout from "../../components/layout";
import { useParams } from "react-router-dom";
const BookingDetails = () => {
  const { id } = useParams();
  console.log(id);

  return (
    <Layout>
      <></>
    </Layout>
  );
};

export default BookingDetails;
