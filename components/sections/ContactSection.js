import React, { useRef, useState } from 'react';
import SectionLayout from '../layouts/SectionLayout';
import httpObservable from 'simplehttpobservable';
import getConfig from 'next/config';
import ReCAPTCHA from 'react-google-recaptcha';

const { publicRuntimeConfig } = getConfig();

const ContactSection = () => {
  const emailRef = useRef();
  const messageRef = useRef();
  const recaptchaRef = React.createRef();
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState({});

  const sendMessage = body => {
    httpObservable({
      url: `${publicRuntimeConfig.mailerApi}/mail`,
      options: {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    }).subscribe(
      res => {
        emailRef.current.value = '';
        messageRef.current.value = '';
        setSent(true);
        setErrors({});
      },
      err => {
        setErrors({ global: err.message });
      }
    );
  };

  const handleChangeCaptcha = value => {
    let recaptcha = '';
    if (!value) {
      recaptcha = 'Please, confirm your humanity';
    }
    // update using previous state
    setErrors(errors => ({ ...errors, recaptcha: recaptcha }));
  };

  const handleSubmitForm = e => {
    e.preventDefault();

    let valid = true;

    const submitErrors = {};

    const email_reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email_reg.test(emailRef.current.value)) {
      submitErrors.email = 'A valid email is needed';
      valid = false;
    }

    if (!messageRef.current.value || messageRef.current.value.length > 300) {
      submitErrors.message = 'A valid message with a maximum of 300 characters is needed';
      valid = false;
    }

    if (!recaptchaRef.current.getValue()) {
      submitErrors.recaptcha = 'Please, confirm your humanity';
      valid = false;
    }

    if (valid) {
      sendMessage({
        email: emailRef.current.value,
        message: messageRef.current.value,
        recaptcha: recaptchaRef.current.getValue(),
      });
    } else {
      setErrors(submitErrors);
    }
  };

  return (
    <SectionLayout id="contact" className="section-contact m-bg-gd-primary-l">
      <div data-trigger-anim="contact-title" className="title-box m-fx-cl-en-st">
        <h2 className="m-fs-xl m-tx-primary m-wt-900">Contact</h2>
      </div>

      <div className="content-box">
        {!sent && (
          <form action="#" className="m-fx-cl-c-sh" onSubmit={handleSubmitForm}>
            {errors.global && <span className="m-invalid m-pd-xt-v">{errors.global}</span>}
            <div className="control m-mg-ty-b m-tx-primary m-fx-cl">
              <input
                aria-label="Email"
                ref={emailRef}
                name="email"
                type="email"
                placeholder="email"
                className="contact__email control__input m-pd-xt m-tx-white m-bd-ty-alert-b m-bg-primary-light"
              />
              {errors.email && <div className="control__error m-invalid m-pd-xt m-mg-xt-t">{errors.email}</div>}
            </div>
            <div className="control m-mg-ty-b m-fx-cl">
              <textarea
                aria-label="Message"
                ref={messageRef}
                name="message"
                type="text"
                maxLength="300"
                placeholder="message"
                className="contact__message control__input m-pd-xt m-tx-white m-bd-ty-alert-b m-bg-primary-light"
              />
              {errors.message && <div className="control__error m-invalid m-pd-xt m-mg-xt-t">{errors.message}</div>}
            </div>
            <div className="control m-fx-c-c m-mg-md-b">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="6LcTwaEUAAAAAHIe1_sOuQvCH5PnTU0h-vF1U8wI"
                size="normal"
                onChange={handleChangeCaptcha}
              />
              {errors.recaptcha && <div className="control__error m-invalid m-pd-xt m-mg-xt-t">{errors.recaptcha}</div>}
            </div>

            <button aria-label="Send" className="btn m-alert m-pd-xt">
              Send
            </button>
          </form>
        )}

        {sent && (
          <div className="sent-box m-tx-valid m-fx-cl-c-c">
            <img data-src="/static/images/rocket-icon.svg" alt="Message envoyé" className="sent-image" />
            <p className="m-tx-white m-fs-ty m-mg-xt-t m-tx-c m-wt-700">Message sent, thank you for visiting</p>
          </div>
        )}
      </div>
    </SectionLayout>
  );
};

export default ContactSection;
