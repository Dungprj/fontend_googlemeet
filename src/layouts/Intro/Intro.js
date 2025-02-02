import Header from '~/layouts/components/Header';

function Intro({ children }) {
    return (
        <div>
            <Header />

            <div className='container' style={{ marginTop: 100 }}>
                <div className='content'>{children}</div>
            </div>
        </div>
    );
}

export default Intro;
