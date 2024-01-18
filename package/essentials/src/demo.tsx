import React, { useState, useCallback, useEffect, useMemo } from 'react';
import styles from './demo.module.scss';

type StateType = {
  count: number;
};

export class Counter extends React.PureComponent<unknown, StateType> {
  state = {
    count: 1,
  };
  onAdd() {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  }
  render() {
    return (
      <button data-testid="add-btn" onClick={() => this.onAdd()}>
        {this.state.count}
      </button>
    );
  }
}

type NewsItemType = {
  title: string;
  url: string;
};
const NEWS_API = 'http://hn.algolia.com/api/v1/search';
const useNewsList = () => {
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState<Array<NewsItemType>>([]);

  const getNewsList = useCallback(async (searchKeyword = 'react.js') => {
    try {
      setLoading(true);
      const res = await (await fetch(`${NEWS_API}?query=${searchKeyword}`, { method: 'get' })).json();
      // console.log(res);
      setNewsList(res.hits ?? []);
    } catch (err) {
      console.error(err);
      setNewsList([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getNewsList();
  }, [getNewsList]);

  return { loading, newsList, getNewsList };
};

export const NewsBoard = () => {
  const { loading, newsList, getNewsList } = useNewsList();
  const [keyword, setKeyword] = useState<string>('react.js');
  const onReload = useCallback(async () => {
    await getNewsList(keyword);
  }, [keyword, getNewsList]);
  const onKeywordChange = useCallback(
    (event: React.ChangeEvent) => {
      setKeyword((event.target as HTMLInputElement).value);
    },
    [setKeyword],
  );
  const newsListToRender = useMemo(() => {
    return newsList?.filter((one) => one.title?.length > 0);
  }, [newsList]);

  return (
    <>
      <section>
        <button data-testid="search-btn" onClick={onReload}>
          search
        </button>
        <input value={keyword} onChange={onKeywordChange} />
      </section>
      <section>
        {loading ? (
          <p>loading...</p>
        ) : newsListToRender?.length > 0 ? (
          <ul>
            {newsListToRender?.map((one: NewsItemType) => (
              <li key={one.title}>
                <a href={one.url}>{one.title}</a>
              </li>
            ))}
          </ul>
        ) : (
          <p>empty</p>
        )}
      </section>
      <section className={styles.withLeftGap}>{!loading && newsListToRender.length > 0 ? `${newsListToRender.length} items` : ''}</section>
    </>
  );
};
