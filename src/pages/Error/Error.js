import { useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div>
            <h1>Too many visits, please try again after a few minutes</h1>
            <div className="flexGrow">
                <button onClick={goBack}>Go Back</button>
            </div>
        </div>
    );
}

export default Error;
