import { useTranslation, Trans } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteQuiz } from '../../../../service/apiService';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataQuizDelete } = props;
    const { t } = useTranslation();

    const handleClose = () => setShow(false);
    const handleSubmitDeleteQuiz = async() => {
        let data = await deleteQuiz(dataQuizDelete)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            await props.fetchQuiz();
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('modal-quiz.de-title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('modal-quiz.confirm-d')}<b> ID:
                    {dataQuizDelete && dataQuizDelete.id ? dataQuizDelete.id : ""}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    {t('m-user.close')}
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteQuiz}>
                    {t('m-user.confirm-b')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteQuiz;