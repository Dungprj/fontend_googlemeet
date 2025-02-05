import HeaderGoogle from '../components/HeaderGoogle';

function Intro({ children }) {
    return (
        <div>
            <HeaderGoogle />
            <div className='container'>
                <div className='content'>{children}</div>
            </div>
        </div>
    );
}

export default Intro;
