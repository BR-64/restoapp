export default function AddressCard({ address }) {
  return (
    <div className='p-4 border rounded shadow mb-4 text-left'>
      <p>
        <strong>House No:</strong> {address.house_no}
      </p>
      <p>
        <strong>Street:</strong> {address.street}
      </p>
      <p>
        <strong>Subdistrict:</strong> {address.subdistrict}
      </p>
      <p>
        <strong>District:</strong> {address.district}
      </p>
      <p>
        <strong>Zip:</strong> {address.zip}
      </p>
      <p>
        <strong>Tel:</strong> {address.tel}
      </p>
    </div>
  );
}
