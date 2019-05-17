import React, { useState, useRef, useEffect } from 'react';
import { fromEvent, of, pipe } from 'rxjs';
import Cookies from 'universal-cookie';
import { v4 as uuid } from 'uuid';
import { exhaustMap, tap, filter, debounceTime, distinctUntilChanged, catchError, retry } from 'rxjs/operators';
import httpObservable from 'simplehttpobservable';
import getConfig from 'next/config';
import classNames from 'classnames';

const { publicRuntimeConfig } = getConfig();

const cookies = new Cookies();

const cookieName = 'XD-WPAGE-UID';

const Chatbot = () => {
  const sendButtonRef = useRef();
  const messageInputRef = useRef();
  const messagesRef = useRef();
  const [messages, setMessages] = useState([]);
  const [show, setShow] = useState(false);

  let _fetchFromClick$ = null;
  let _fetchFromEnter$ = null;

  if (cookies.get(cookieName) === undefined) {
    cookies.set(cookieName, uuid(), { path: '/' });
  }

  useEffect(() => {
    //messagesRef.current.scrollTop = messagesRef.current.scrollHeight;

    subscribeEvents();
  }, []);

  // On update messages
  useEffect(() => {
    if (messages.length > 0 && document.getElementById('messages')) {
      autoScroll(document.getElementById('messages'));
    }
  }, [messages]);

  const fetchBotResponse = (text, userID) => {
    return httpObservable({
      url: `${publicRuntimeConfig.botApi}/api/chatbot/text_query`,
      options: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, userID }),
      },
    });
  };

  const extendObservable = observable$ => {
    return observable$.pipe(
      tap(() => {
        const message = {
          from: 'you',
          msg: {
            text: messageInputRef.current.value,
          },
        };

        setMessages(messages => [...messages, message]);
      }),
      debounceTime(1000),
      exhaustMap(() => fetchBotResponse(messageInputRef.current.value, cookies.get(cookieName))),
      catchError(err => {
        return of({ fulfillmentText: `Sorry, I'm currently busy.` });
      })
    );
  };

  const subscribeObservable = observable$ => {
    return observable$.subscribe(fetchRes => {
      if (fetchRes.fulfillmentText) {
        let botResponse = {
          from: 'bot',
          msg: {
            text: fetchRes.fulfillmentText,
          },
        };

        setMessages(messages => [...messages, botResponse]);
        messageInputRef.current.value = '';
      }
    });
  };

  const subscribeEvents = () => {
    _fetchFromClick$ = fromEvent(sendButtonRef.current, 'click').pipe(filter(e => !!messageInputRef.current.value));

    _fetchFromEnter$ = fromEvent(messageInputRef.current, 'keypress').pipe(
      filter(e => !!messageInputRef.current.value && e.key === 'Enter')
    );

    _fetchFromClick$ = extendObservable(_fetchFromClick$);
    _fetchFromEnter$ = extendObservable(_fetchFromEnter$);

    subscribeObservable(_fetchFromClick$);
    subscribeObservable(_fetchFromEnter$);
  };

  const autoScroll = $messages => {
    // Reminder
    // scrollHeight: total container size.
    // scrollTop: amount of scroll user has done.
    // clientHeight: amount of container an user sees.

    $messages.scrollTop = $messages.scrollHeight - $messages.clientHeight;
  };

  const handleCloseChatbot = () => {
    setShow(false);
  };

  const handleShowChatbot = () => {
    setShow(true);
  };

  return (
    <>
      <div className={classNames('chatbot m-rd-xt m-sw-xt-y', { 'm-vs-hn': !show })}>
        {/* header */}
        <div className="chatbot__header m-pd-xt m-primary m-fx-sb-c">
          <span>Chatbot</span>
          <img
            src="/static/images/close-icon.svg"
            alt="close chatbot"
            className="btn close-cta icon"
            onClick={handleCloseChatbot}
          />
        </div>
        {/* Messages */}
        <div ref={messagesRef} id="messages" className="message-box m-pd-xt-h m-pd-ty-b">
          {messages.map((message, index) => {
            if (message.from === 'you') {
              return (
                <div key={index} className="message left m-mg-sm-t">
                  <span className="message-header m-primary m-rd-xx m-fx-c-c">{message.from}</span>
                  <div className="message-body m-primary m-tx-l m-pd-ty m-mg-ty-l m-rd-xt">{message.msg.text}</div>
                </div>
              );
            } else {
              return (
                <div key={index} className="message right m-mg-sm-t">
                  <div className="message-body m-alert m-pd-ty m-mg-ty-r m-rd-xt">{message.msg.text}</div>
                  <span className="message-header m-alert m-rd-xx m-fx-c-c">{message.from}</span>
                </div>
              );
            }
          })}
        </div>

        <div className="chatbot__footer m-pd-xt">
          <div className="control chatbot__input">
            <input
              ref={messageInputRef}
              type="text"
              className="control__input m-tx-grey-dark-1 m-rd-xt-l m-bd-xt-primary m-pd-xt-h"
              maxLength="100"
              placeholder="Message..."
            />
            <button ref={sendButtonRef} className="send-cta btn m-primary m-pd-xt m-rd-xt-r m-ef-hv-bg-1">
              <img src="/static/images/paperplane.svg" alt="Envoyer message chatbot" />
            </button>
          </div>
        </div>
      </div>

      {!show && (
        <button
          className="toggle-chat btn m-primary m-bd-xt-alert m-fx-c-c m-pd-xt m-rd-xx m-sw m-ef-hv-bg-1 m-dp-no-small"
          onClick={handleShowChatbot}
        >
          <img src="/static/images/robot-icon.svg" alt="Toggle chatbot" />
        </button>
      )}
    </>
  );
};

export default Chatbot;
