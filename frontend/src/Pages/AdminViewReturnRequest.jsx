// Admin Dashboard to Approve Returns
const AdminViewReturnRequest = () => {
    const [returns, setReturns] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchReturns = async () => {
            try {
                const response = await axios.get("/api/returns");
                setReturns(response.data);
            } catch (err) {
                console.error("Error fetching returns", err);
            }
        };
        fetchReturns();
    }, []);

    const handleApprove = async (id, fine) => {
        if (fine > 0) {
            setMessage("Fine must be paid before approving return");
            return;
        }
        try {
            await axios.put(`/api/return/approve/${id}`);
            setMessage("Return approved");
            setReturns(returns.filter((r) => r._id !== id));
        } catch (err) {
            setMessage("Error approving return");
        }
    };

    return (
        <div>
            <h2>Return Requests</h2>
            {message && <p>{message}</p>}
            <ul>
                {returns.map((r) => (
                    <li key={r._id}>
                        Order ID: {r.orderId} | Status: {r.status} | Fine: {r.fine > 0 ? `Rs. ${r.fine}` : "No Fine"}
                        <button onClick={() => handleApprove(r._id, r.fine)}>Approve Return</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminViewReturnRequest;