import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase';
import { makeStyles } from '@material-ui/core/styles';
import Admin from 'layouts/Admin.js';
import Divider from '@material-ui/core/Divider';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { motion } from 'framer-motion';
import GridItem from 'components/Grid/GridItem.js';
import Button from 'components/CustomButtons/Button.js';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';
import { useRouter } from 'next/router';
import ManageFAQ from 'components/Menu/faqMenu.js';
import PageLoad from 'components/PageLoad/PageLoad.js';

const useStyles = makeStyles({
  cardCategoryWhite: {
    color: '#434444',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#434444',
    marginTop: '0px',
    fontSize: '25px',
    minHeight: 'auto',
    fontWeight: 'bold',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
    '& small': {
      color: '#777',
      fontSize: '65%',
      fontWeight: '400',
      lineHeight: '1',
    },
  },
  pagination: {
    padding: '10px',
  },
  root: {
    paddingTop: '3px',
  },
  btn: {
    float: 'right',
  },
  cardItem: {
    paddingRight: '10px',
    paddingLeft: '10px',
    marginTop: '0px',
    fontSize: '17px',
  },
  cardItemTitle: {
    paddingRight: '10px',
    paddingLeft: '10px',
    marginBottom: '3px',
    marginTop: '15px',
    fontWeight: 400,
    fontSize: '25px',
  },
});

export default function Reports() {
  const classes = useStyles();
  const router = useRouter();
  const [faqs, setFAQs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalFaqs, setTotalFaqsSize] = useState(0);
  const [lastVisibleData, setLastVisibleData] = useState(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [open, SetOpen] = useState(false);

  const containerVariants = {
    hidden: {
      opacity: 0.5,
      scale: 1.1,
      y: 10,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { delay: 0, duration: 0.5 },
    },
  };

  const handleChangePage = (event, newPage) => {
    newPage > page ? fetchNextFaqs() : fetchPreviousFaqs();
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    fetchFAQs();
  };

  const faqsSize = () => {
    firestore
      .collection('faqs')
      .get()
      .then((snap) => {
        setTotalFaqsSize(snap.size);
      });
  };

  const fetchNextFaqs = async () => {
    const faqArr = [];
    firestore
      .collection('faqs')
      .orderBy('title')
      .startAfter(lastVisibleData)
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((alert) => {
          let currentAlertData = alert.data();
          currentAlertData.id = alert.id;
          faqArr.push(currentAlertData);
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setFAQs(faqArr);
      });
  };

  const fetchPreviousFaqs = async () => {
    const faqArr = [];
    firestore
      .collection('faqs')
      .orderBy('title')
      .endBefore(lastVisibleData)
      .limit(rowsPerPage)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((alert) => {
          let currentAlertData = alert.data();
          currentAlertData.id = alert.id;
          faqArr.push(currentAlertData);
          setLastVisibleData(querySnapshot.docs[querySnapshot.docs.length - 1]);
        });
      })
      .then(() => {
        setFAQs(faqArr);
      });
  };

  // fetch faqs from firestore
  const fetchFAQs = async () => {
    const faqArr = [];
    firestore
      .collection('faqs')
      .orderBy('title')
      .limit(rowsPerPage)
      .get()
      .then((snap) => {
        snap.forEach((faq) => {
          let newFaq = faq.data();
          newFaq.id = faq.id;
          faqArr.push(newFaq);
          setLastVisibleData(snap.docs[snap.docs.length - 1]);
        });
      })
      .then(() => {
        setFAQs(faqArr);
      });
  };

  useEffect(() => {
    fetchFAQs();
    faqsSize();
    auth.onAuthStateChanged(async (user) => {
      if (!user) {
        router.push('../login');
      } else {
        setIsUserLoggedIn(true);
      }
    });
  }, []);

  return isUserLoggedIn ? (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <GridContainer className={classes.container}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader>
              <GridContainer>
                <GridItem xs={12} sm={12} md={10}>
                  <h4 className={classes.cardTitleWhite}>
                    Frequently Asked Questions
                    <Button
                      size="sm"
                      color="primary"
                      className={classes.btn}
                      onClick={() => router.push('add-faq')}
                    >
                      Add A FAQ
                    </Button>
                  </h4>
                </GridItem>
                <GridItem xs={12} sm={12} md={2}></GridItem>
              </GridContainer>
            </CardHeader>

            <CardBody>
              <Paper className={classes.root}>
                {faqs.map((faq) => (
                  <>
                    <Accordion style={{ marginBottom: 5 }}>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography style={{ fontWeight: 'bold' }}>
                          <GridContainer style={{ paddingLeft: 10 }}>
                            {faq.title}
                          </GridContainer>
                        </Typography>
                      </AccordionSummary>

                      <AccordionDetails>
                        <ManageFAQ
                          faq={faq}
                          fetchFAQs={fetchFAQs}
                          style={{ float: 'right' }}
                        />
                        <Typography
                          dangerouslySetInnerHTML={{ __html: faq.text }}
                        />
                      </AccordionDetails>
                    </Accordion>
                    <Divider />
                  </>
                ))}
              </Paper>
            </CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={10} container justify="center">
                <TablePagination
                  component="div"
                  count={totalFaqs}
                  page={page}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </GridItem>
              <GridItem xs={12} sm={12} md={2} container></GridItem>
            </GridContainer>
          </Card>
        </GridItem>
      </GridContainer>
    </motion.main>
  ) : null;
}
Reports.layout = Admin;
