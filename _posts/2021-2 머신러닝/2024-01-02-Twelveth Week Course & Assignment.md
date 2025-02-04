---
layout: single
title:  "Twelveth Week Course & Assignment"
categories: coding
tag: [python, blog, jupyter]
toc: true
author_profile: false
---

<head>
  <style>
    table.dataframe {
      white-space: normal;
      width: 100%;
      height: 240px;
      display: block;
      overflow: auto;
      font-family: Arial, sans-serif;
      font-size: 0.9rem;
      line-height: 20px;
      text-align: center;
      border: 0px !important;
    }

    table.dataframe th {
      text-align: center;
      font-weight: bold;
      padding: 8px;
    }

    table.dataframe td {
      text-align: center;
      padding: 8px;
    }

    table.dataframe tr:hover {
      background: #b8d1f3; 
    }

    .output_prompt {
      overflow: auto;
      font-size: 0.9rem;
      line-height: 1.45;
      border-radius: 0.3rem;
      -webkit-overflow-scrolling: touch;
      padding: 0.8rem;
      margin-top: 0;
      margin-bottom: 15px;
      font: 1rem Consolas, "Liberation Mono", Menlo, Courier, monospace;
      color: $code-text-color;
      border: solid 1px $border-color;
      border-radius: 0.3rem;
      word-break: normal;
      white-space: pre;
    }

  .dataframe tbody tr th:only-of-type {
      vertical-align: middle;
  }

  .dataframe tbody tr th {
      vertical-align: top;
  }

  .dataframe thead th {
      text-align: center !important;
      padding: 8px;
  }

  .page__content p {
      margin: 0 0 0px !important;
  }

  .page__content p > strong {
    font-size: 0.8rem !important;
  }

  </style>
</head>


# 12주차 강의내용


### 변수중요도



```python
import pandas as pd
import numpy as np
from sklearn import model_selection
from sklearn.tree import DecisionTreeClassifier

# 타이타닉 데이터 로드
df=pd.read_csv("data/titanic.csv", index_col=["PassengerId"])

# 변수 제거
df=df.drop(["Name","Ticket","Cabin","Embarked"],axis=1)

# 결측치 처리
df.Age.fillna(df.Age.median(), inplace=True)

# 진위형 변수로 변겅
df["Sex"]=df.Sex.map({"female":0,"male":1})

# Input 변수와 Output 변수 구분
X = np.array(df.iloc[:,1:])
y = np.array(df["Survived"])

from sklearn.model_selection import train_test_split
X_train,X_test,y_train,y_test = train_test_split(X, y, test_size=0.3, random_state=0)

tree = DecisionTreeClassifier(max_depth=3, random_state=0) 
tree.fit(X_train, y_train)
```

<pre>
DecisionTreeClassifier(max_depth=3, random_state=0)
</pre>

```python
# 각 변수에 대한 중요도 값들이 array로 반환됨
tree.feature_importances_
```

<pre>
array([0.17568873, 0.61552198, 0.06794334, 0.08767138, 0.        ,
       0.05317456])
</pre>

```python
# 데이터 프레임으로 만들기. 데이터프레임에 넣으려면 2차원 배열 형태로 만들어야 한다.
pd.DataFrame(tree.feature_importances_.reshape((1,-1)), index=['feature_importance'])
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>feature_importance</th>
      <td>0.175689</td>
      <td>0.615522</td>
      <td>0.067943</td>
      <td>0.087671</td>
      <td>0.0</td>
      <td>0.053175</td>
    </tr>
  </tbody>
</table>
</div>



```python
df.columns # survived가 필요없을 것이다?그래서 빼준다
```

<pre>
Index(['Survived', 'Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare'], dtype='object')
</pre>

```python
pd.DataFrame(tree.feature_importances_.reshape((1,-1)), columns=df.columns[1:], index=['feature_importance'])
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>feature_importance</th>
      <td>0.175689</td>
      <td>0.615522</td>
      <td>0.067943</td>
      <td>0.087671</td>
      <td>0.0</td>
      <td>0.053175</td>
    </tr>
  </tbody>
</table>
</div>


### 원핫인코딩



```python
import pandas as pd
import numpy as np
from sklearn.preprocessing import OneHotEncoder
```


```python
# 타이타닉 데이터에서 탑승항구(Embarked) 변수를 one hot encoding 해보자
df=pd.read_csv("data/titanic.csv", index_col=["PassengerId"])
print(df.shape)
df.head()
```

<pre>
(891, 11)
</pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
    </tr>
    <tr>
      <th>PassengerId</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>0</td>
      <td>3</td>
      <td>Braund, Mr. Owen Harris</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>1</td>
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>3</td>
      <td>Heikkinen, Miss. Laina</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>1</td>
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>C123</td>
      <td>S</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0</td>
      <td>3</td>
      <td>Allen, Mr. William Henry</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>



```python
# 불필요한 변수 제거
df=df.drop(['Name', 'Ticket', 'Cabin'],axis=1)
```


```python
df.isnull().sum()
```

<pre>
Survived      0
Pclass        0
Sex           0
Age         177
SibSp         0
Parch         0
Fare          0
Embarked      2
dtype: int64
</pre>

```python
# Age의 결측치는 중간값으로, Embarked의 결측치는 제거
df.Age.fillna(df.Age.median(), inplace=True)
df=df.dropna() #디폴트는 axis=0 행제거
```


```python
df
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
      <th>Embarked</th>
    </tr>
    <tr>
      <th>PassengerId</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>7.2500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>71.2833</td>
      <td>C</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>3</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.9250</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>53.1000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>8.0500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>887</th>
      <td>0</td>
      <td>2</td>
      <td>male</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>13.0000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>888</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>19.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>889</th>
      <td>0</td>
      <td>3</td>
      <td>female</td>
      <td>28.0</td>
      <td>1</td>
      <td>2</td>
      <td>23.4500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>890</th>
      <td>1</td>
      <td>1</td>
      <td>male</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>C</td>
    </tr>
    <tr>
      <th>891</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>32.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.7500</td>
      <td>Q</td>
    </tr>
  </tbody>
</table>
<p>889 rows × 8 columns</p>
</div>



```python
# 결측치 제거 이후 index를 재조정 - PassengerId 제거 (889행인데 passengerId는 891로 찍히니)
df=df.reset_index(drop=True)
```


```python
df
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
      <th>Embarked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>7.2500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>71.2833</td>
      <td>C</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>3</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.9250</td>
      <td>S</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>53.1000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>8.0500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>884</th>
      <td>0</td>
      <td>2</td>
      <td>male</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>13.0000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>885</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>19.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>886</th>
      <td>0</td>
      <td>3</td>
      <td>female</td>
      <td>28.0</td>
      <td>1</td>
      <td>2</td>
      <td>23.4500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>887</th>
      <td>1</td>
      <td>1</td>
      <td>male</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>C</td>
    </tr>
    <tr>
      <th>888</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>32.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.7500</td>
      <td>Q</td>
    </tr>
  </tbody>
</table>
<p>889 rows × 8 columns</p>
</div>



```python
# "OneHotEncoder"를 "encoder"라는 변수에 저장
encoder=OneHotEncoder()
```


```python
# 'encoder'를 사용해 Embarked 항목 값으로 학습
encoder.fit(df[['Embarked']])
```

<pre>
OneHotEncoder()
</pre>

```python
# "encoder"의 transform()를 사용해 'Embarked' 변수를 변환해 'onehot'이라는 변수에 저장
onehot=encoder.transform(df[["Embarked"]])
```


```python
# 'onehot'이라는 변수를 array 형태로 변환
onehot=onehot.toarray()
```


```python
onehot # S,C,Q 세가지 값을 1과 0인 형태로
```

<pre>
array([[0., 0., 1.],
       [1., 0., 0.],
       [0., 0., 1.],
       ...,
       [0., 0., 1.],
       [1., 0., 0.],
       [0., 1., 0.]])
</pre>

```python
# 'onehot'이라는 변수를 DataFrame 형태로 변환
onehot=pd.DataFrame(onehot)
```


```python
onehot
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>884</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>885</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>886</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>887</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>888</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>889 rows × 3 columns</p>
</div>



```python
# 참고) encoder의 'get_feature_names()'를 사용하면 column 이름을 자동생성할 수도 있음(변수 항목이 많은 경우에 유용)
encoder.get_feature_names()
```

<pre>
array(['x0_C', 'x0_Q', 'x0_S'], dtype=object)
</pre>

```python
# 컬럼 이름을 직접 생성
onehot.columns=['C','Q','S']
```


```python
# 인코딩 결과 확인
onehot
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>C</th>
      <th>Q</th>
      <th>S</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>884</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>885</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>886</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>887</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>888</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>889 rows × 3 columns</p>
</div>



```python
# 기존 df에 인코딩 결과를 병합
onehot=pd.concat([df,onehot],axis=1)
```


```python
onehot
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
      <th>Embarked</th>
      <th>C</th>
      <th>Q</th>
      <th>S</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>7.2500</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>71.2833</td>
      <td>C</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>3</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.9250</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>53.1000</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>8.0500</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>884</th>
      <td>0</td>
      <td>2</td>
      <td>male</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>13.0000</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>885</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>19.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>886</th>
      <td>0</td>
      <td>3</td>
      <td>female</td>
      <td>28.0</td>
      <td>1</td>
      <td>2</td>
      <td>23.4500</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>887</th>
      <td>1</td>
      <td>1</td>
      <td>male</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>C</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>888</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>32.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.7500</td>
      <td>Q</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>889 rows × 11 columns</p>
</div>



```python
# 인코딩 전 'Embarked' 변수 제거 후 df에 업데이트(Embarked말고 새로 생성한 변수를 써야하는 거니까)
df=onehot.drop('Embarked', axis=1)
```


```python
df
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
      <th>C</th>
      <th>Q</th>
      <th>S</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>7.2500</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>71.2833</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>3</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.9250</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>53.1000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>8.0500</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>884</th>
      <td>0</td>
      <td>2</td>
      <td>male</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>13.0000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>885</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>19.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>886</th>
      <td>0</td>
      <td>3</td>
      <td>female</td>
      <td>28.0</td>
      <td>1</td>
      <td>2</td>
      <td>23.4500</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>887</th>
      <td>1</td>
      <td>1</td>
      <td>male</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>888</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>32.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.7500</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>889 rows × 10 columns</p>
</div>


### -> 이렇게 하면 수치형 변수가 아닌 칼럼들도 머신러닝에 사용가능.해당 변수가 유의미한 변수라면 모델 정확도를 더 높일 수 있음


### 연관 규칙 분석(얼마나 해당 모델들이 아이리스 데이터의 품종을 잘 구분하고 있는가)



```python
# Machine Learning Extended 패키지 설치
!pip install mlxtend
```

<pre>
Requirement already satisfied: mlxtend in c:\users\administrator\anaconda3\lib\site-packages (0.19.0)
Requirement already satisfied: setuptools in c:\users\administrator\anaconda3\lib\site-packages (from mlxtend) (52.0.0.post20210125)
Requirement already satisfied: scipy>=1.2.1 in c:\users\administrator\anaconda3\lib\site-packages (from mlxtend) (1.6.2)
Requirement already satisfied: numpy>=1.16.2 in c:\users\administrator\anaconda3\lib\site-packages (from mlxtend) (1.20.1)
Requirement already satisfied: scikit-learn>=0.20.3 in c:\users\administrator\anaconda3\lib\site-packages (from mlxtend) (0.24.1)
Requirement already satisfied: pandas>=0.24.2 in c:\users\administrator\anaconda3\lib\site-packages (from mlxtend) (1.2.4)
Requirement already satisfied: joblib>=0.13.2 in c:\users\administrator\anaconda3\lib\site-packages (from mlxtend) (1.0.1)
Requirement already satisfied: matplotlib>=3.0.0 in c:\users\administrator\anaconda3\lib\site-packages (from mlxtend) (3.3.4)
Requirement already satisfied: pillow>=6.2.0 in c:\users\administrator\anaconda3\lib\site-packages (from matplotlib>=3.0.0->mlxtend) (8.2.0)
Requirement already satisfied: kiwisolver>=1.0.1 in c:\users\administrator\anaconda3\lib\site-packages (from matplotlib>=3.0.0->mlxtend) (1.3.1)
Requirement already satisfied: python-dateutil>=2.1 in c:\users\administrator\anaconda3\lib\site-packages (from matplotlib>=3.0.0->mlxtend) (2.8.1)
Requirement already satisfied: pyparsing!=2.0.4,!=2.1.2,!=2.1.6,>=2.0.3 in c:\users\administrator\anaconda3\lib\site-packages (from matplotlib>=3.0.0->mlxtend) (2.4.7)
Requirement already satisfied: cycler>=0.10 in c:\users\administrator\anaconda3\lib\site-packages (from matplotlib>=3.0.0->mlxtend) (0.10.0)
Requirement already satisfied: six in c:\users\administrator\anaconda3\lib\site-packages (from cycler>=0.10->matplotlib>=3.0.0->mlxtend) (1.15.0)
Requirement already satisfied: pytz>=2017.3 in c:\users\administrator\anaconda3\lib\site-packages (from pandas>=0.24.2->mlxtend) (2021.1)
Requirement already satisfied: threadpoolctl>=2.0.0 in c:\users\administrator\anaconda3\lib\site-packages (from scikit-learn>=0.20.3->mlxtend) (2.1.0)
</pre>

```python
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import itertools
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier
from mlxtend.classifier import EnsembleVoteClassifier
from mlxtend.data import iris_data
from mlxtend.plotting import plot_decision_regions

# Initializing Classifiers
clf1 = LogisticRegression(random_state=0)
clf2 = RandomForestClassifier(random_state=0)
clf3 = SVC(random_state=0, probability=True)
eclf = EnsembleVoteClassifier(clfs=[clf1, clf2, clf3],
                              weights=[2, 1, 1], voting='soft')

# Loading some example data
X, y = iris_data()
X = X[:,[0, 2]]

# Plotting Decision Regions

gs = gridspec.GridSpec(2, 2)
fig = plt.figure(figsize=(10, 8))

labels = ['Logistic Regression',
          'Random Forest',
          'RBF kernel SVM',
          'Ensemble']

for clf, lab, grd in zip([clf1, clf2, clf3, eclf],
                         labels,
                         itertools.product([0, 1],
                         repeat=2)):
    clf.fit(X, y)
    ax = plt.subplot(gs[grd[0], grd[1]])
    fig = plot_decision_regions(X=X, y=y,
                                clf=clf, legend=2)
    plt.title(lab)

plt.show()
```

<img src="data:image/png;base64,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"/>

### 연관규칙 분석



```python
import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules
```


```python
# 리스트의 리스트 형태로 트랜잭션 구성
dataset = [['빵', '우유', '씨리얼',],
          ['빵','기저귀','맥주','계란'],
          ['우유','기저귀','맥주','콜라'],
          ['빵','우유','기저귀','맥주'],
          ['빵','우유','기저귀','콜라','삼겹살'],
          ['우유','계란','씨리얼'],
          ['우유','기저귀','콜라','맥주'],
          ['삼겹살','콜라','맥주'],
          ['빵','우유','기저귀','맥주','계란'],
          ['우유','빵'],
          ['우유','씨리얼']]
```


```python
# TransactionEncoder는 리스트의 리스트로 구성된 트랜잭션 데이터를 numpy 배열로 인코딩하기 위함
te = TransactionEncoder()
te_ary=te.fit(dataset).transform(dataset)
te_ary
```

<pre>
array([[False, False, False,  True, False,  True,  True, False],
       [ True,  True,  True,  True, False, False, False, False],
       [False,  True,  True, False, False, False,  True,  True],
       [False,  True,  True,  True, False, False,  True, False],
       [False,  True, False,  True,  True, False,  True,  True],
       [ True, False, False, False, False,  True,  True, False],
       [False,  True,  True, False, False, False,  True,  True],
       [False, False,  True, False,  True, False, False,  True],
       [ True,  True,  True,  True, False, False,  True, False],
       [False, False, False,  True, False, False,  True, False],
       [False, False, False, False, False,  True,  True, False]])
</pre>

```python
te.columns_
```

<pre>
['계란', '기저귀', '맥주', '빵', '삼겹살', '씨리얼', '우유', '콜라']
</pre>

```python
df=pd.DataFrame(te_ary, columns=te.columns_)
df
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>계란</th>
      <th>기저귀</th>
      <th>맥주</th>
      <th>빵</th>
      <th>삼겹살</th>
      <th>씨리얼</th>
      <th>우유</th>
      <th>콜라</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>1</th>
      <td>True</td>
      <td>True</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>2</th>
      <td>False</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>True</td>
    </tr>
    <tr>
      <th>3</th>
      <td>False</td>
      <td>True</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>4</th>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>True</td>
    </tr>
    <tr>
      <th>5</th>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>6</th>
      <td>False</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>True</td>
    </tr>
    <tr>
      <th>7</th>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>8</th>
      <td>True</td>
      <td>True</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>9</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>10</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
    </tr>
  </tbody>
</table>
</div>



```python
# 지지도 확인. 설정을 안해주면 기본적으로 0.5이상인 값들만 보여줌. 
frequent_itemsets=apriori(df, use_colnames=True)
frequent_itemsets
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>support</th>
      <th>itemsets</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.545455</td>
      <td>(기저귀)</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.545455</td>
      <td>(맥주)</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.545455</td>
      <td>(빵)</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.818182</td>
      <td>(우유)</td>
    </tr>
  </tbody>
</table>
</div>



```python
# 지지도값 0.3 이상인 것들 다 가져오기
frequent_itemsets=apriori(df, min_support=0.3,use_colnames=True)
frequent_itemsets
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>support</th>
      <th>itemsets</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.545455</td>
      <td>(기저귀)</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.545455</td>
      <td>(맥주)</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.545455</td>
      <td>(빵)</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.818182</td>
      <td>(우유)</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.363636</td>
      <td>(콜라)</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0.454545</td>
      <td>(기저귀, 맥주)</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0.363636</td>
      <td>(빵, 기저귀)</td>
    </tr>
    <tr>
      <th>7</th>
      <td>0.454545</td>
      <td>(기저귀, 우유)</td>
    </tr>
    <tr>
      <th>8</th>
      <td>0.363636</td>
      <td>(맥주, 우유)</td>
    </tr>
    <tr>
      <th>9</th>
      <td>0.454545</td>
      <td>(빵, 우유)</td>
    </tr>
    <tr>
      <th>10</th>
      <td>0.363636</td>
      <td>(기저귀, 맥주, 우유)</td>
    </tr>
  </tbody>
</table>
</div>



```python
# 지지도 내림차순으로 정렬
frequent_itemsets.sort_values('support',ascending=False)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>support</th>
      <th>itemsets</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>3</th>
      <td>0.818182</td>
      <td>(우유)</td>
    </tr>
    <tr>
      <th>0</th>
      <td>0.545455</td>
      <td>(기저귀)</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.545455</td>
      <td>(맥주)</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.545455</td>
      <td>(빵)</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0.454545</td>
      <td>(기저귀, 맥주)</td>
    </tr>
    <tr>
      <th>7</th>
      <td>0.454545</td>
      <td>(기저귀, 우유)</td>
    </tr>
    <tr>
      <th>9</th>
      <td>0.454545</td>
      <td>(빵, 우유)</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.363636</td>
      <td>(콜라)</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0.363636</td>
      <td>(빵, 기저귀)</td>
    </tr>
    <tr>
      <th>8</th>
      <td>0.363636</td>
      <td>(맥주, 우유)</td>
    </tr>
    <tr>
      <th>10</th>
      <td>0.363636</td>
      <td>(기저귀, 맥주, 우유)</td>
    </tr>
  </tbody>
</table>
</div>



```python
# 신뢰도 확인 기본적으로는 0.8이상 되는 값들만 가져옴
association_rules(frequent_itemsets, metric="confidence")
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>antecedents</th>
      <th>consequents</th>
      <th>antecedent support</th>
      <th>consequent support</th>
      <th>support</th>
      <th>confidence</th>
      <th>lift</th>
      <th>leverage</th>
      <th>conviction</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>(기저귀)</td>
      <td>(맥주)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.527778</td>
      <td>0.157025</td>
      <td>2.727273</td>
    </tr>
    <tr>
      <th>1</th>
      <td>(맥주)</td>
      <td>(기저귀)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.527778</td>
      <td>0.157025</td>
      <td>2.727273</td>
    </tr>
    <tr>
      <th>2</th>
      <td>(기저귀)</td>
      <td>(우유)</td>
      <td>0.545455</td>
      <td>0.818182</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.018519</td>
      <td>0.008264</td>
      <td>1.090909</td>
    </tr>
    <tr>
      <th>3</th>
      <td>(빵)</td>
      <td>(우유)</td>
      <td>0.545455</td>
      <td>0.818182</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.018519</td>
      <td>0.008264</td>
      <td>1.090909</td>
    </tr>
    <tr>
      <th>4</th>
      <td>(기저귀, 맥주)</td>
      <td>(우유)</td>
      <td>0.454545</td>
      <td>0.818182</td>
      <td>0.363636</td>
      <td>0.800000</td>
      <td>0.977778</td>
      <td>-0.008264</td>
      <td>0.909091</td>
    </tr>
    <tr>
      <th>5</th>
      <td>(기저귀, 우유)</td>
      <td>(맥주)</td>
      <td>0.454545</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.800000</td>
      <td>1.466667</td>
      <td>0.115702</td>
      <td>2.272727</td>
    </tr>
    <tr>
      <th>6</th>
      <td>(맥주, 우유)</td>
      <td>(기저귀)</td>
      <td>0.363636</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>1.000000</td>
      <td>1.833333</td>
      <td>0.165289</td>
      <td>inf</td>
    </tr>
  </tbody>
</table>
</div>



```python
# 신뢰도 확인 0.3 이상되는 값들 다 가져옴
association_rules(frequent_itemsets, metric="confidence", min_threshold=0.3)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>antecedents</th>
      <th>consequents</th>
      <th>antecedent support</th>
      <th>consequent support</th>
      <th>support</th>
      <th>confidence</th>
      <th>lift</th>
      <th>leverage</th>
      <th>conviction</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>(기저귀)</td>
      <td>(맥주)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.527778</td>
      <td>0.157025</td>
      <td>2.727273</td>
    </tr>
    <tr>
      <th>1</th>
      <td>(맥주)</td>
      <td>(기저귀)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.527778</td>
      <td>0.157025</td>
      <td>2.727273</td>
    </tr>
    <tr>
      <th>2</th>
      <td>(빵)</td>
      <td>(기저귀)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.666667</td>
      <td>1.222222</td>
      <td>0.066116</td>
      <td>1.363636</td>
    </tr>
    <tr>
      <th>3</th>
      <td>(기저귀)</td>
      <td>(빵)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.666667</td>
      <td>1.222222</td>
      <td>0.066116</td>
      <td>1.363636</td>
    </tr>
    <tr>
      <th>4</th>
      <td>(기저귀)</td>
      <td>(우유)</td>
      <td>0.545455</td>
      <td>0.818182</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.018519</td>
      <td>0.008264</td>
      <td>1.090909</td>
    </tr>
    <tr>
      <th>5</th>
      <td>(우유)</td>
      <td>(기저귀)</td>
      <td>0.818182</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.555556</td>
      <td>1.018519</td>
      <td>0.008264</td>
      <td>1.022727</td>
    </tr>
    <tr>
      <th>6</th>
      <td>(맥주)</td>
      <td>(우유)</td>
      <td>0.545455</td>
      <td>0.818182</td>
      <td>0.363636</td>
      <td>0.666667</td>
      <td>0.814815</td>
      <td>-0.082645</td>
      <td>0.545455</td>
    </tr>
    <tr>
      <th>7</th>
      <td>(우유)</td>
      <td>(맥주)</td>
      <td>0.818182</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.444444</td>
      <td>0.814815</td>
      <td>-0.082645</td>
      <td>0.818182</td>
    </tr>
    <tr>
      <th>8</th>
      <td>(빵)</td>
      <td>(우유)</td>
      <td>0.545455</td>
      <td>0.818182</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.018519</td>
      <td>0.008264</td>
      <td>1.090909</td>
    </tr>
    <tr>
      <th>9</th>
      <td>(우유)</td>
      <td>(빵)</td>
      <td>0.818182</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.555556</td>
      <td>1.018519</td>
      <td>0.008264</td>
      <td>1.022727</td>
    </tr>
    <tr>
      <th>10</th>
      <td>(기저귀, 맥주)</td>
      <td>(우유)</td>
      <td>0.454545</td>
      <td>0.818182</td>
      <td>0.363636</td>
      <td>0.800000</td>
      <td>0.977778</td>
      <td>-0.008264</td>
      <td>0.909091</td>
    </tr>
    <tr>
      <th>11</th>
      <td>(기저귀, 우유)</td>
      <td>(맥주)</td>
      <td>0.454545</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.800000</td>
      <td>1.466667</td>
      <td>0.115702</td>
      <td>2.272727</td>
    </tr>
    <tr>
      <th>12</th>
      <td>(맥주, 우유)</td>
      <td>(기저귀)</td>
      <td>0.363636</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>1.000000</td>
      <td>1.833333</td>
      <td>0.165289</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>13</th>
      <td>(기저귀)</td>
      <td>(맥주, 우유)</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.363636</td>
      <td>0.666667</td>
      <td>1.833333</td>
      <td>0.165289</td>
      <td>1.909091</td>
    </tr>
    <tr>
      <th>14</th>
      <td>(맥주)</td>
      <td>(기저귀, 우유)</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.363636</td>
      <td>0.666667</td>
      <td>1.466667</td>
      <td>0.115702</td>
      <td>1.636364</td>
    </tr>
    <tr>
      <th>15</th>
      <td>(우유)</td>
      <td>(기저귀, 맥주)</td>
      <td>0.818182</td>
      <td>0.454545</td>
      <td>0.363636</td>
      <td>0.444444</td>
      <td>0.977778</td>
      <td>-0.008264</td>
      <td>0.981818</td>
    </tr>
  </tbody>
</table>
</div>



```python
# 향상도 확인 1 이상인 값들만 의미가 있음
association_rules(frequent_itemsets, metric="lift", min_threshold=1)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>antecedents</th>
      <th>consequents</th>
      <th>antecedent support</th>
      <th>consequent support</th>
      <th>support</th>
      <th>confidence</th>
      <th>lift</th>
      <th>leverage</th>
      <th>conviction</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>(기저귀)</td>
      <td>(맥주)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.527778</td>
      <td>0.157025</td>
      <td>2.727273</td>
    </tr>
    <tr>
      <th>1</th>
      <td>(맥주)</td>
      <td>(기저귀)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.527778</td>
      <td>0.157025</td>
      <td>2.727273</td>
    </tr>
    <tr>
      <th>2</th>
      <td>(빵)</td>
      <td>(기저귀)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.666667</td>
      <td>1.222222</td>
      <td>0.066116</td>
      <td>1.363636</td>
    </tr>
    <tr>
      <th>3</th>
      <td>(기저귀)</td>
      <td>(빵)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.666667</td>
      <td>1.222222</td>
      <td>0.066116</td>
      <td>1.363636</td>
    </tr>
    <tr>
      <th>4</th>
      <td>(기저귀)</td>
      <td>(우유)</td>
      <td>0.545455</td>
      <td>0.818182</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.018519</td>
      <td>0.008264</td>
      <td>1.090909</td>
    </tr>
    <tr>
      <th>5</th>
      <td>(우유)</td>
      <td>(기저귀)</td>
      <td>0.818182</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.555556</td>
      <td>1.018519</td>
      <td>0.008264</td>
      <td>1.022727</td>
    </tr>
    <tr>
      <th>6</th>
      <td>(빵)</td>
      <td>(우유)</td>
      <td>0.545455</td>
      <td>0.818182</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.018519</td>
      <td>0.008264</td>
      <td>1.090909</td>
    </tr>
    <tr>
      <th>7</th>
      <td>(우유)</td>
      <td>(빵)</td>
      <td>0.818182</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.555556</td>
      <td>1.018519</td>
      <td>0.008264</td>
      <td>1.022727</td>
    </tr>
    <tr>
      <th>8</th>
      <td>(기저귀, 우유)</td>
      <td>(맥주)</td>
      <td>0.454545</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.800000</td>
      <td>1.466667</td>
      <td>0.115702</td>
      <td>2.272727</td>
    </tr>
    <tr>
      <th>9</th>
      <td>(맥주, 우유)</td>
      <td>(기저귀)</td>
      <td>0.363636</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>1.000000</td>
      <td>1.833333</td>
      <td>0.165289</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>10</th>
      <td>(기저귀)</td>
      <td>(맥주, 우유)</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.363636</td>
      <td>0.666667</td>
      <td>1.833333</td>
      <td>0.165289</td>
      <td>1.909091</td>
    </tr>
    <tr>
      <th>11</th>
      <td>(맥주)</td>
      <td>(기저귀, 우유)</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.363636</td>
      <td>0.666667</td>
      <td>1.466667</td>
      <td>0.115702</td>
      <td>1.636364</td>
    </tr>
  </tbody>
</table>
</div>



```python
# 향상도는 1부터 의미가 있어지는 값이기 때문에 높을수록 좋음. 1.2 이상인 것들만 불러오고 값을 내림차순으로 정렬하겠다
df_assoc=association_rules(frequent_itemsets, metric="lift", min_threshold=1.2)
df_assoc.sort_values('lift',ascending=False)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>antecedents</th>
      <th>consequents</th>
      <th>antecedent support</th>
      <th>consequent support</th>
      <th>support</th>
      <th>confidence</th>
      <th>lift</th>
      <th>leverage</th>
      <th>conviction</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>5</th>
      <td>(맥주, 우유)</td>
      <td>(기저귀)</td>
      <td>0.363636</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>1.000000</td>
      <td>1.833333</td>
      <td>0.165289</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>6</th>
      <td>(기저귀)</td>
      <td>(맥주, 우유)</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.363636</td>
      <td>0.666667</td>
      <td>1.833333</td>
      <td>0.165289</td>
      <td>1.909091</td>
    </tr>
    <tr>
      <th>0</th>
      <td>(기저귀)</td>
      <td>(맥주)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.527778</td>
      <td>0.157025</td>
      <td>2.727273</td>
    </tr>
    <tr>
      <th>1</th>
      <td>(맥주)</td>
      <td>(기저귀)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.833333</td>
      <td>1.527778</td>
      <td>0.157025</td>
      <td>2.727273</td>
    </tr>
    <tr>
      <th>4</th>
      <td>(기저귀, 우유)</td>
      <td>(맥주)</td>
      <td>0.454545</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.800000</td>
      <td>1.466667</td>
      <td>0.115702</td>
      <td>2.272727</td>
    </tr>
    <tr>
      <th>7</th>
      <td>(맥주)</td>
      <td>(기저귀, 우유)</td>
      <td>0.545455</td>
      <td>0.454545</td>
      <td>0.363636</td>
      <td>0.666667</td>
      <td>1.466667</td>
      <td>0.115702</td>
      <td>1.636364</td>
    </tr>
    <tr>
      <th>2</th>
      <td>(빵)</td>
      <td>(기저귀)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.666667</td>
      <td>1.222222</td>
      <td>0.066116</td>
      <td>1.363636</td>
    </tr>
    <tr>
      <th>3</th>
      <td>(기저귀)</td>
      <td>(빵)</td>
      <td>0.545455</td>
      <td>0.545455</td>
      <td>0.363636</td>
      <td>0.666667</td>
      <td>1.222222</td>
      <td>0.066116</td>
      <td>1.363636</td>
    </tr>
  </tbody>
</table>
</div>


### -> 맥주 귀저귀 같이 팔거나 빵 기저귀 같이 팔도록 추천해줄 수 있겠다


# 12주차 개인톡 과제

- 아래 거래 데이터에서 추출된 연관 규칙 중 사과(X)와 딸기(Y)에

대한 신뢰도, 지지도, 향상도를 구하시오.



```python
import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules
```


```python
# 리스트의 리스트 형태로 트랜잭션 구성
dataset = [['A', 'C',],
          ['배','사과','포도'],
          ['배','자몽'],
          ['사과','딸기'],
          ['배','사과','포도','딸기'],
          ['자몽','배']
          []]
```


```python
# TransactionEncoder는 리스트의 리스트로 구성된 트랜잭션 데이터를 numpy 배열로 인코딩하기 위함
te = TransactionEncoder()
te_ary=te.fit(dataset).transform(dataset)
te_ary
```

<pre>
array([[ True,  True,  True, False, False],
       [False,  True,  True, False,  True],
       [False,  True, False,  True, False],
       [ True, False,  True, False, False],
       [ True,  True,  True, False,  True],
       [False,  True, False,  True, False]])
</pre>

```python
te.columns_
```

<pre>
['딸기', '배', '사과', '자몽', '포도']
</pre>

```python
df=pd.DataFrame(te_ary, columns=te.columns_)
df
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>딸기</th>
      <th>배</th>
      <th>사과</th>
      <th>자몽</th>
      <th>포도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>True</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>1</th>
      <td>False</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>2</th>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>3</th>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>4</th>
      <td>True</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>5</th>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
    </tr>
  </tbody>
</table>
</div>



```python
# (사과, 딸기) 지지도 확인. 지지도값 0.3 이상인 것들 다 가져오기
frequent_itemsets=apriori(df, min_support=0.3,use_colnames=True)
frequent_itemsets
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>support</th>
      <th>itemsets</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.500000</td>
      <td>(딸기)</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.833333</td>
      <td>(배)</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.666667</td>
      <td>(사과)</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.333333</td>
      <td>(자몽)</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.333333</td>
      <td>(포도)</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0.333333</td>
      <td>(딸기, 배)</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0.500000</td>
      <td>(사과, 딸기)</td>
    </tr>
    <tr>
      <th>7</th>
      <td>0.500000</td>
      <td>(사과, 배)</td>
    </tr>
    <tr>
      <th>8</th>
      <td>0.333333</td>
      <td>(자몽, 배)</td>
    </tr>
    <tr>
      <th>9</th>
      <td>0.333333</td>
      <td>(포도, 배)</td>
    </tr>
    <tr>
      <th>10</th>
      <td>0.333333</td>
      <td>(사과, 포도)</td>
    </tr>
    <tr>
      <th>11</th>
      <td>0.333333</td>
      <td>(사과, 딸기, 배)</td>
    </tr>
    <tr>
      <th>12</th>
      <td>0.333333</td>
      <td>(사과, 포도, 배)</td>
    </tr>
  </tbody>
</table>
</div>



```python
# (사과,딸기) 신뢰도(conficence) 확인 -> 0.75 
# 0.3 이상되는 값들 다 가져옴
association_rules(frequent_itemsets, metric="confidence", min_threshold=0.3)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>antecedents</th>
      <th>consequents</th>
      <th>antecedent support</th>
      <th>consequent support</th>
      <th>support</th>
      <th>confidence</th>
      <th>lift</th>
      <th>leverage</th>
      <th>conviction</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>(딸기)</td>
      <td>(배)</td>
      <td>0.500000</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>0.800000</td>
      <td>-0.083333</td>
      <td>0.500000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>(배)</td>
      <td>(딸기)</td>
      <td>0.833333</td>
      <td>0.500000</td>
      <td>0.333333</td>
      <td>0.400000</td>
      <td>0.800000</td>
      <td>-0.083333</td>
      <td>0.833333</td>
    </tr>
    <tr>
      <th>2</th>
      <td>(사과)</td>
      <td>(딸기)</td>
      <td>0.666667</td>
      <td>0.500000</td>
      <td>0.500000</td>
      <td>0.750000</td>
      <td>1.500000</td>
      <td>0.166667</td>
      <td>2.000000</td>
    </tr>
    <tr>
      <th>3</th>
      <td>(딸기)</td>
      <td>(사과)</td>
      <td>0.500000</td>
      <td>0.666667</td>
      <td>0.500000</td>
      <td>1.000000</td>
      <td>1.500000</td>
      <td>0.166667</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>4</th>
      <td>(사과)</td>
      <td>(배)</td>
      <td>0.666667</td>
      <td>0.833333</td>
      <td>0.500000</td>
      <td>0.750000</td>
      <td>0.900000</td>
      <td>-0.055556</td>
      <td>0.666667</td>
    </tr>
    <tr>
      <th>5</th>
      <td>(배)</td>
      <td>(사과)</td>
      <td>0.833333</td>
      <td>0.666667</td>
      <td>0.500000</td>
      <td>0.600000</td>
      <td>0.900000</td>
      <td>-0.055556</td>
      <td>0.833333</td>
    </tr>
    <tr>
      <th>6</th>
      <td>(자몽)</td>
      <td>(배)</td>
      <td>0.333333</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>1.200000</td>
      <td>0.055556</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>7</th>
      <td>(배)</td>
      <td>(자몽)</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.400000</td>
      <td>1.200000</td>
      <td>0.055556</td>
      <td>1.111111</td>
    </tr>
    <tr>
      <th>8</th>
      <td>(포도)</td>
      <td>(배)</td>
      <td>0.333333</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>1.200000</td>
      <td>0.055556</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>9</th>
      <td>(배)</td>
      <td>(포도)</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.400000</td>
      <td>1.200000</td>
      <td>0.055556</td>
      <td>1.111111</td>
    </tr>
    <tr>
      <th>10</th>
      <td>(사과)</td>
      <td>(포도)</td>
      <td>0.666667</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.500000</td>
      <td>1.500000</td>
      <td>0.111111</td>
      <td>1.333333</td>
    </tr>
    <tr>
      <th>11</th>
      <td>(포도)</td>
      <td>(사과)</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>1.500000</td>
      <td>0.111111</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>12</th>
      <td>(사과, 딸기)</td>
      <td>(배)</td>
      <td>0.500000</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>0.800000</td>
      <td>-0.083333</td>
      <td>0.500000</td>
    </tr>
    <tr>
      <th>13</th>
      <td>(사과, 배)</td>
      <td>(딸기)</td>
      <td>0.500000</td>
      <td>0.500000</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>1.333333</td>
      <td>0.083333</td>
      <td>1.500000</td>
    </tr>
    <tr>
      <th>14</th>
      <td>(딸기, 배)</td>
      <td>(사과)</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>1.500000</td>
      <td>0.111111</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>15</th>
      <td>(사과)</td>
      <td>(딸기, 배)</td>
      <td>0.666667</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.500000</td>
      <td>1.500000</td>
      <td>0.111111</td>
      <td>1.333333</td>
    </tr>
    <tr>
      <th>16</th>
      <td>(딸기)</td>
      <td>(사과, 배)</td>
      <td>0.500000</td>
      <td>0.500000</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>1.333333</td>
      <td>0.083333</td>
      <td>1.500000</td>
    </tr>
    <tr>
      <th>17</th>
      <td>(배)</td>
      <td>(사과, 딸기)</td>
      <td>0.833333</td>
      <td>0.500000</td>
      <td>0.333333</td>
      <td>0.400000</td>
      <td>0.800000</td>
      <td>-0.083333</td>
      <td>0.833333</td>
    </tr>
    <tr>
      <th>18</th>
      <td>(사과, 포도)</td>
      <td>(배)</td>
      <td>0.333333</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>1.200000</td>
      <td>0.055556</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>19</th>
      <td>(사과, 배)</td>
      <td>(포도)</td>
      <td>0.500000</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>2.000000</td>
      <td>0.166667</td>
      <td>2.000000</td>
    </tr>
    <tr>
      <th>20</th>
      <td>(포도, 배)</td>
      <td>(사과)</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>1.500000</td>
      <td>0.111111</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>21</th>
      <td>(사과)</td>
      <td>(포도, 배)</td>
      <td>0.666667</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.500000</td>
      <td>1.500000</td>
      <td>0.111111</td>
      <td>1.333333</td>
    </tr>
    <tr>
      <th>22</th>
      <td>(포도)</td>
      <td>(사과, 배)</td>
      <td>0.333333</td>
      <td>0.500000</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>2.000000</td>
      <td>0.166667</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>23</th>
      <td>(배)</td>
      <td>(사과, 포도)</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.400000</td>
      <td>1.200000</td>
      <td>0.055556</td>
      <td>1.111111</td>
    </tr>
  </tbody>
</table>
</div>



```python
# (사과, 딸기) 향상도 확인 1 이상인 값들만 의미가 있음 -> lift 1.5
association_rules(frequent_itemsets, metric="lift", min_threshold=1)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>antecedents</th>
      <th>consequents</th>
      <th>antecedent support</th>
      <th>consequent support</th>
      <th>support</th>
      <th>confidence</th>
      <th>lift</th>
      <th>leverage</th>
      <th>conviction</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>(사과)</td>
      <td>(딸기)</td>
      <td>0.666667</td>
      <td>0.500000</td>
      <td>0.500000</td>
      <td>0.750000</td>
      <td>1.500000</td>
      <td>0.166667</td>
      <td>2.000000</td>
    </tr>
    <tr>
      <th>1</th>
      <td>(딸기)</td>
      <td>(사과)</td>
      <td>0.500000</td>
      <td>0.666667</td>
      <td>0.500000</td>
      <td>1.000000</td>
      <td>1.500000</td>
      <td>0.166667</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>2</th>
      <td>(자몽)</td>
      <td>(배)</td>
      <td>0.333333</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>1.200000</td>
      <td>0.055556</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>3</th>
      <td>(배)</td>
      <td>(자몽)</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.400000</td>
      <td>1.200000</td>
      <td>0.055556</td>
      <td>1.111111</td>
    </tr>
    <tr>
      <th>4</th>
      <td>(포도)</td>
      <td>(배)</td>
      <td>0.333333</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>1.200000</td>
      <td>0.055556</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>5</th>
      <td>(배)</td>
      <td>(포도)</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.400000</td>
      <td>1.200000</td>
      <td>0.055556</td>
      <td>1.111111</td>
    </tr>
    <tr>
      <th>6</th>
      <td>(사과)</td>
      <td>(포도)</td>
      <td>0.666667</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.500000</td>
      <td>1.500000</td>
      <td>0.111111</td>
      <td>1.333333</td>
    </tr>
    <tr>
      <th>7</th>
      <td>(포도)</td>
      <td>(사과)</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>1.500000</td>
      <td>0.111111</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>8</th>
      <td>(사과, 배)</td>
      <td>(딸기)</td>
      <td>0.500000</td>
      <td>0.500000</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>1.333333</td>
      <td>0.083333</td>
      <td>1.500000</td>
    </tr>
    <tr>
      <th>9</th>
      <td>(딸기, 배)</td>
      <td>(사과)</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>1.500000</td>
      <td>0.111111</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>10</th>
      <td>(사과)</td>
      <td>(딸기, 배)</td>
      <td>0.666667</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.500000</td>
      <td>1.500000</td>
      <td>0.111111</td>
      <td>1.333333</td>
    </tr>
    <tr>
      <th>11</th>
      <td>(딸기)</td>
      <td>(사과, 배)</td>
      <td>0.500000</td>
      <td>0.500000</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>1.333333</td>
      <td>0.083333</td>
      <td>1.500000</td>
    </tr>
    <tr>
      <th>12</th>
      <td>(사과, 포도)</td>
      <td>(배)</td>
      <td>0.333333</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>1.200000</td>
      <td>0.055556</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>13</th>
      <td>(사과, 배)</td>
      <td>(포도)</td>
      <td>0.500000</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>2.000000</td>
      <td>0.166667</td>
      <td>2.000000</td>
    </tr>
    <tr>
      <th>14</th>
      <td>(포도, 배)</td>
      <td>(사과)</td>
      <td>0.333333</td>
      <td>0.666667</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>1.500000</td>
      <td>0.111111</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>15</th>
      <td>(사과)</td>
      <td>(포도, 배)</td>
      <td>0.666667</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.500000</td>
      <td>1.500000</td>
      <td>0.111111</td>
      <td>1.333333</td>
    </tr>
    <tr>
      <th>16</th>
      <td>(포도)</td>
      <td>(사과, 배)</td>
      <td>0.333333</td>
      <td>0.500000</td>
      <td>0.333333</td>
      <td>1.000000</td>
      <td>2.000000</td>
      <td>0.166667</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>17</th>
      <td>(배)</td>
      <td>(사과, 포도)</td>
      <td>0.833333</td>
      <td>0.333333</td>
      <td>0.333333</td>
      <td>0.400000</td>
      <td>1.200000</td>
      <td>0.055556</td>
      <td>1.111111</td>
    </tr>
  </tbody>
</table>
</div>


# 12주차 단톡과제 1

- 60191315 박온지

- 아래 데이터로 파이썬 코드를 이용하여 연관규칙분석을 수행하라

- 신뢰도, 지지도와 향상도를 고려하여 본인이 판단하기에 추천할 만한 묶음컨텐츠를 제시할 것(본인 나름대로)



```python
import pandas as pd
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules
```


```python
# 리스트의 리스트 형태로 트랜잭션 구성
dataset = [['겨울왕국', '미녀와 야수', '쥬라기 월드','아바타','타이타닉'],
          ['스타워즈','어벤져스','아이언맨'],
          ['분노의 질주','어벤져스'],
          ['스타워즈','아바타','라이온 킹','어벤져스'],
          ['쥬라기 월드','아바타','해리포터'],
          ['스타워즈','겨울왕국','미녀와 야수','라이온 킹','타이타닉'],
          ['스타워즈','어벤져스','분노의 질주','쥬라기 월드']]
```


```python
# TransactionEncoder는 리스트의 리스트로 구성된 트랜잭션 데이터를 numpy 배열로 인코딩하기 위함
te = TransactionEncoder()
te_ary=te.fit(dataset).transform(dataset)
te_ary
```

<pre>
array([[ True, False,  True, False, False,  True, False, False,  True,
         True, False],
       [False, False, False, False,  True, False,  True,  True, False,
        False, False],
       [False, False, False,  True, False, False, False,  True, False,
        False, False],
       [False,  True, False, False,  True,  True, False,  True, False,
        False, False],
       [False, False, False, False, False,  True, False, False,  True,
        False,  True],
       [ True,  True,  True, False,  True, False, False, False, False,
         True, False],
       [False, False, False,  True,  True, False, False,  True,  True,
        False, False]])
</pre>

```python
te.columns_
```

<pre>
['겨울왕국',
 '라이온 킹',
 '미녀와 야수',
 '분노의 질주',
 '스타워즈',
 '아바타',
 '아이언맨',
 '어벤져스',
 '쥬라기 월드',
 '타이타닉',
 '해리포터']
</pre>

```python
df=pd.DataFrame(te_ary, columns=te.columns_)
df
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>겨울왕국</th>
      <th>라이온 킹</th>
      <th>미녀와 야수</th>
      <th>분노의 질주</th>
      <th>스타워즈</th>
      <th>아바타</th>
      <th>아이언맨</th>
      <th>어벤져스</th>
      <th>쥬라기 월드</th>
      <th>타이타닉</th>
      <th>해리포터</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>1</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>2</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>3</th>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>4</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>5</th>
      <td>True</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>6</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
    </tr>
  </tbody>
</table>
</div>



```python
# 지지도값 0.25 이상인 것들 다 가져오기
frequent_itemsets=apriori(df, min_support=0.25,use_colnames=True)
frequent_itemsets.sort_values('support',ascending=False)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>support</th>
      <th>itemsets</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>4</th>
      <td>0.571429</td>
      <td>(스타워즈)</td>
    </tr>
    <tr>
      <th>6</th>
      <td>0.571429</td>
      <td>(어벤져스)</td>
    </tr>
    <tr>
      <th>14</th>
      <td>0.428571</td>
      <td>(어벤져스, 스타워즈)</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0.428571</td>
      <td>(아바타)</td>
    </tr>
    <tr>
      <th>7</th>
      <td>0.428571</td>
      <td>(쥬라기 월드)</td>
    </tr>
    <tr>
      <th>0</th>
      <td>0.285714</td>
      <td>(겨울왕국)</td>
    </tr>
    <tr>
      <th>11</th>
      <td>0.285714</td>
      <td>(스타워즈, 라이온 킹)</td>
    </tr>
    <tr>
      <th>15</th>
      <td>0.285714</td>
      <td>(아바타, 쥬라기 월드)</td>
    </tr>
    <tr>
      <th>13</th>
      <td>0.285714</td>
      <td>(어벤져스, 분노의 질주)</td>
    </tr>
    <tr>
      <th>12</th>
      <td>0.285714</td>
      <td>(타이타닉, 미녀와 야수)</td>
    </tr>
    <tr>
      <th>8</th>
      <td>0.285714</td>
      <td>(타이타닉)</td>
    </tr>
    <tr>
      <th>10</th>
      <td>0.285714</td>
      <td>(겨울왕국, 타이타닉)</td>
    </tr>
    <tr>
      <th>9</th>
      <td>0.285714</td>
      <td>(겨울왕국, 미녀와 야수)</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.285714</td>
      <td>(라이온 킹)</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.285714</td>
      <td>(분노의 질주)</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.285714</td>
      <td>(미녀와 야수)</td>
    </tr>
    <tr>
      <th>16</th>
      <td>0.285714</td>
      <td>(겨울왕국, 타이타닉, 미녀와 야수)</td>
    </tr>
  </tbody>
</table>
</div>



```python
# 신뢰도 확인 0.3 이상되는 값들 다 가져옴
df_con=association_rules(frequent_itemsets, metric="confidence", min_threshold=0.3)
df_con.sort_values('confidence', ascending=False)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>antecedents</th>
      <th>consequents</th>
      <th>antecedent support</th>
      <th>consequent support</th>
      <th>support</th>
      <th>confidence</th>
      <th>lift</th>
      <th>leverage</th>
      <th>conviction</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>(겨울왕국)</td>
      <td>(미녀와 야수)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>9</th>
      <td>(분노의 질주)</td>
      <td>(어벤져스)</td>
      <td>0.285714</td>
      <td>0.571429</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>1.750000</td>
      <td>0.122449</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>18</th>
      <td>(타이타닉)</td>
      <td>(겨울왕국, 미녀와 야수)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>17</th>
      <td>(겨울왕국)</td>
      <td>(타이타닉, 미녀와 야수)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>16</th>
      <td>(타이타닉, 미녀와 야수)</td>
      <td>(겨울왕국)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>15</th>
      <td>(겨울왕국, 미녀와 야수)</td>
      <td>(타이타닉)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>14</th>
      <td>(겨울왕국, 타이타닉)</td>
      <td>(미녀와 야수)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>1</th>
      <td>(미녀와 야수)</td>
      <td>(겨울왕국)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>19</th>
      <td>(미녀와 야수)</td>
      <td>(겨울왕국, 타이타닉)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>7</th>
      <td>(미녀와 야수)</td>
      <td>(타이타닉)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>6</th>
      <td>(타이타닉)</td>
      <td>(미녀와 야수)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>5</th>
      <td>(라이온 킹)</td>
      <td>(스타워즈)</td>
      <td>0.285714</td>
      <td>0.571429</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>1.750000</td>
      <td>0.122449</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>3</th>
      <td>(타이타닉)</td>
      <td>(겨울왕국)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>2</th>
      <td>(겨울왕국)</td>
      <td>(타이타닉)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>11</th>
      <td>(스타워즈)</td>
      <td>(어벤져스)</td>
      <td>0.571429</td>
      <td>0.571429</td>
      <td>0.428571</td>
      <td>0.750000</td>
      <td>1.312500</td>
      <td>0.102041</td>
      <td>1.714286</td>
    </tr>
    <tr>
      <th>10</th>
      <td>(어벤져스)</td>
      <td>(스타워즈)</td>
      <td>0.571429</td>
      <td>0.571429</td>
      <td>0.428571</td>
      <td>0.750000</td>
      <td>1.312500</td>
      <td>0.102041</td>
      <td>1.714286</td>
    </tr>
    <tr>
      <th>12</th>
      <td>(아바타)</td>
      <td>(쥬라기 월드)</td>
      <td>0.428571</td>
      <td>0.428571</td>
      <td>0.285714</td>
      <td>0.666667</td>
      <td>1.555556</td>
      <td>0.102041</td>
      <td>1.714286</td>
    </tr>
    <tr>
      <th>13</th>
      <td>(쥬라기 월드)</td>
      <td>(아바타)</td>
      <td>0.428571</td>
      <td>0.428571</td>
      <td>0.285714</td>
      <td>0.666667</td>
      <td>1.555556</td>
      <td>0.102041</td>
      <td>1.714286</td>
    </tr>
    <tr>
      <th>8</th>
      <td>(어벤져스)</td>
      <td>(분노의 질주)</td>
      <td>0.571429</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.500000</td>
      <td>1.750000</td>
      <td>0.122449</td>
      <td>1.428571</td>
    </tr>
    <tr>
      <th>4</th>
      <td>(스타워즈)</td>
      <td>(라이온 킹)</td>
      <td>0.571429</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.500000</td>
      <td>1.750000</td>
      <td>0.122449</td>
      <td>1.428571</td>
    </tr>
  </tbody>
</table>
</div>



```python
# 향상도 확인 1 이상인 값들만 의미가 있음
df_lift=association_rules(frequent_itemsets, metric="lift", min_threshold=1)
df_lift.sort_values('lift', ascending=False)
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>antecedents</th>
      <th>consequents</th>
      <th>antecedent support</th>
      <th>consequent support</th>
      <th>support</th>
      <th>confidence</th>
      <th>lift</th>
      <th>leverage</th>
      <th>conviction</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>(겨울왕국)</td>
      <td>(미녀와 야수)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>1</th>
      <td>(미녀와 야수)</td>
      <td>(겨울왕국)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>18</th>
      <td>(타이타닉)</td>
      <td>(겨울왕국, 미녀와 야수)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>17</th>
      <td>(겨울왕국)</td>
      <td>(타이타닉, 미녀와 야수)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>16</th>
      <td>(타이타닉, 미녀와 야수)</td>
      <td>(겨울왕국)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>15</th>
      <td>(겨울왕국, 미녀와 야수)</td>
      <td>(타이타닉)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>14</th>
      <td>(겨울왕국, 타이타닉)</td>
      <td>(미녀와 야수)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>19</th>
      <td>(미녀와 야수)</td>
      <td>(겨울왕국, 타이타닉)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>7</th>
      <td>(미녀와 야수)</td>
      <td>(타이타닉)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>6</th>
      <td>(타이타닉)</td>
      <td>(미녀와 야수)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>3</th>
      <td>(타이타닉)</td>
      <td>(겨울왕국)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>2</th>
      <td>(겨울왕국)</td>
      <td>(타이타닉)</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>3.500000</td>
      <td>0.204082</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>8</th>
      <td>(어벤져스)</td>
      <td>(분노의 질주)</td>
      <td>0.571429</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.500000</td>
      <td>1.750000</td>
      <td>0.122449</td>
      <td>1.428571</td>
    </tr>
    <tr>
      <th>9</th>
      <td>(분노의 질주)</td>
      <td>(어벤져스)</td>
      <td>0.285714</td>
      <td>0.571429</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>1.750000</td>
      <td>0.122449</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>5</th>
      <td>(라이온 킹)</td>
      <td>(스타워즈)</td>
      <td>0.285714</td>
      <td>0.571429</td>
      <td>0.285714</td>
      <td>1.000000</td>
      <td>1.750000</td>
      <td>0.122449</td>
      <td>inf</td>
    </tr>
    <tr>
      <th>4</th>
      <td>(스타워즈)</td>
      <td>(라이온 킹)</td>
      <td>0.571429</td>
      <td>0.285714</td>
      <td>0.285714</td>
      <td>0.500000</td>
      <td>1.750000</td>
      <td>0.122449</td>
      <td>1.428571</td>
    </tr>
    <tr>
      <th>12</th>
      <td>(아바타)</td>
      <td>(쥬라기 월드)</td>
      <td>0.428571</td>
      <td>0.428571</td>
      <td>0.285714</td>
      <td>0.666667</td>
      <td>1.555556</td>
      <td>0.102041</td>
      <td>1.714286</td>
    </tr>
    <tr>
      <th>13</th>
      <td>(쥬라기 월드)</td>
      <td>(아바타)</td>
      <td>0.428571</td>
      <td>0.428571</td>
      <td>0.285714</td>
      <td>0.666667</td>
      <td>1.555556</td>
      <td>0.102041</td>
      <td>1.714286</td>
    </tr>
    <tr>
      <th>11</th>
      <td>(스타워즈)</td>
      <td>(어벤져스)</td>
      <td>0.571429</td>
      <td>0.571429</td>
      <td>0.428571</td>
      <td>0.750000</td>
      <td>1.312500</td>
      <td>0.102041</td>
      <td>1.714286</td>
    </tr>
    <tr>
      <th>10</th>
      <td>(어벤져스)</td>
      <td>(스타워즈)</td>
      <td>0.571429</td>
      <td>0.571429</td>
      <td>0.428571</td>
      <td>0.750000</td>
      <td>1.312500</td>
      <td>0.102041</td>
      <td>1.714286</td>
    </tr>
  </tbody>
</table>
</div>


### -> 지지도를 통해 첫번째로 거르자면, 스타워즈와 어벤져스가 지지도가 가장 높으므로 스타워즈 어벤져스를 신뢰도와 향상도 측면에서도 살펴보겠다. 신뢰도가 0.75 향상도가 1.31로 유의미한 값이므로 어벤져스를 본 사람에게는 스타워즈를 추천해주는 게 좋겠다 


# 12주차 단톡과제 2

- 60191315 박온지

- 타이타닉 데이터를 의사결정나무 모형으로 적합시키고 변수중

요도를 구하시오.

- 원핫인코딩으로 탑승항구 정보를 추가하여 모델링할 것

- 탑승항구 정보가 포함된 모델의 성능과 포함되지 않은 모델 중 어느 모델의 성능을 비교하여 탑승항구 정보의 유용성을 판단할 것



```python
#패키지 불러오기
import pandas as pd
import numpy as np
from sklearn import model_selection
from sklearn import metrics
import matplotlib.pyplot as plt
from sklearn import datasets
from sklearn.tree import DecisionTreeClassifier
```


```python
#데이터프레임으로 데이터 읽어오기
df=pd.read_csv("data/titanic.csv", index_col=["PassengerId"])
print(df.shape)
df.head()
```

<pre>
(891, 11)
</pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
    </tr>
    <tr>
      <th>PassengerId</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>0</td>
      <td>3</td>
      <td>Braund, Mr. Owen Harris</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>1</td>
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>3</td>
      <td>Heikkinen, Miss. Laina</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>1</td>
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>C123</td>
      <td>S</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0</td>
      <td>3</td>
      <td>Allen, Mr. William Henry</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>



```python
#필요없는 컬럼 제거-> 생존여부와 연관없는
df=df.drop(['Name', 'Ticket', 'Cabin','Embarked'], axis=1)

#전처리: 진위형 변수로 변경 -> 성별은 문자보다 숫자로 다루는 게 나으니까
df["Sex"] = df.Sex.map({"female":0, "male":1})

#중간값으로 결측치 채워주기
df.Age.fillna(df.Age.median(), inplace=True)

#Input 변수와 Output 변수 구분(생존 변수만 y 변수)
X=np.array(df.iloc[:, 1:]) # 모든 행에 대하여 1번 열 데이터 전까지 가져오기
y=np.array(df['Survived'])

#트레이닝 셋트와 테스트 셋트로 데이터 구분(여기서는 7:3으로 구분)
from sklearn.model_selection import train_test_split

#random_state는 반복적으로 같은 결과를 내기 위해서 설정 무작위 설정
X_train, X_test, y_train, y_test=train_test_split(X, y, test_size=0.3, random_state=0)

#의사결정나무모델에 데이터 적합(fitting) 피팅은 학습시키는 것 학습시키는 모델이 의사결정나무모델
from sklearn.tree import DecisionTreeClassifier

tree=DecisionTreeClassifier(random_state=0, max_depth=3)
tree.fit(X_train, y_train)

#Training값을 X_test에서 넣음
temp_y_pred=tree.predict(X_test)

#정확도 계산
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix

temp_acc1=accuracy_score(y_test, temp_y_pred)
#y_test와 temp_y_pred로 예측한 값을 적용하여 temp_acc로 추출함.

print('정확도:', format(temp_acc1))
```

<pre>
정확도: 0.8208955223880597
</pre>

```python
# 각 변수에 대한 중요도 값들이 array로 반환됨
tree.feature_importances_
```

<pre>
array([0.17568873, 0.61552198, 0.06794334, 0.08767138, 0.        ,
       0.05317456])
</pre>

```python
# 데이터 프레임으로 만들기
pd.DataFrame(tree.feature_importances_.reshape((1,-1)), index=['feature_importance'])
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>feature_importance</th>
      <td>0.175689</td>
      <td>0.615522</td>
      <td>0.067943</td>
      <td>0.087671</td>
      <td>0.0</td>
      <td>0.053175</td>
    </tr>
  </tbody>
</table>
</div>



```python
df.columns # survived가 필요없을 것이다?그래서 빼준다
```

<pre>
Index(['Survived', 'Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare'], dtype='object')
</pre>

```python
pd.DataFrame(tree.feature_importances_.reshape((1,-1)), columns=df.columns[1:], index=['feature_importance'])
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>feature_importance</th>
      <td>0.175689</td>
      <td>0.615522</td>
      <td>0.067943</td>
      <td>0.087671</td>
      <td>0.0</td>
      <td>0.053175</td>
    </tr>
  </tbody>
</table>
</div>


### -> 변수중요도로 보면 성별이 중요도가 높다


## 탑승정보를 포함한 경우(원핫인코딩)



```python
#데이터프레임으로 데이터 읽어오기
df=pd.read_csv("data/titanic.csv", index_col=["PassengerId"])
print(df.shape)
df.head()
```

<pre>
(891, 11)
</pre>
<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Name</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Ticket</th>
      <th>Fare</th>
      <th>Cabin</th>
      <th>Embarked</th>
    </tr>
    <tr>
      <th>PassengerId</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>0</td>
      <td>3</td>
      <td>Braund, Mr. Owen Harris</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>A/5 21171</td>
      <td>7.2500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>1</td>
      <td>Cumings, Mrs. John Bradley (Florence Briggs Th...</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>PC 17599</td>
      <td>71.2833</td>
      <td>C85</td>
      <td>C</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>3</td>
      <td>Heikkinen, Miss. Laina</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>STON/O2. 3101282</td>
      <td>7.9250</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>1</td>
      <td>Futrelle, Mrs. Jacques Heath (Lily May Peel)</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>113803</td>
      <td>53.1000</td>
      <td>C123</td>
      <td>S</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0</td>
      <td>3</td>
      <td>Allen, Mr. William Henry</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>373450</td>
      <td>8.0500</td>
      <td>NaN</td>
      <td>S</td>
    </tr>
  </tbody>
</table>
</div>



```python
# 불필요한 변수 제거
df=df.drop(['Name', 'Ticket', 'Cabin'],axis=1)
```


```python
df.isnull().sum()
```

<pre>
Survived      0
Pclass        0
Sex           0
Age         177
SibSp         0
Parch         0
Fare          0
Embarked      2
dtype: int64
</pre>

```python
# Age의 결측치는 중간값으로, Embarked의 결측치는 제거
df.Age.fillna(df.Age.median(), inplace=True)
df=df.dropna()
```


```python
df
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
      <th>Embarked</th>
    </tr>
    <tr>
      <th>PassengerId</th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>1</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>7.2500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>71.2833</td>
      <td>C</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>3</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.9250</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>53.1000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>5</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>8.0500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>887</th>
      <td>0</td>
      <td>2</td>
      <td>male</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>13.0000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>888</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>19.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>889</th>
      <td>0</td>
      <td>3</td>
      <td>female</td>
      <td>28.0</td>
      <td>1</td>
      <td>2</td>
      <td>23.4500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>890</th>
      <td>1</td>
      <td>1</td>
      <td>male</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>C</td>
    </tr>
    <tr>
      <th>891</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>32.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.7500</td>
      <td>Q</td>
    </tr>
  </tbody>
</table>
<p>889 rows × 8 columns</p>
</div>



```python
# 결측치 제거 이후 index를 재조정 - PassengerId 제거 (889행인데 passengerId는 891로 찍히니)
df=df.reset_index(drop=True)
```


```python
df
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
      <th>Embarked</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>7.2500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>71.2833</td>
      <td>C</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>3</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.9250</td>
      <td>S</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>53.1000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>8.0500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>884</th>
      <td>0</td>
      <td>2</td>
      <td>male</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>13.0000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>885</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>19.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>S</td>
    </tr>
    <tr>
      <th>886</th>
      <td>0</td>
      <td>3</td>
      <td>female</td>
      <td>28.0</td>
      <td>1</td>
      <td>2</td>
      <td>23.4500</td>
      <td>S</td>
    </tr>
    <tr>
      <th>887</th>
      <td>1</td>
      <td>1</td>
      <td>male</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>C</td>
    </tr>
    <tr>
      <th>888</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>32.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.7500</td>
      <td>Q</td>
    </tr>
  </tbody>
</table>
<p>889 rows × 8 columns</p>
</div>



```python
# "OneHotEncoder"를 "encoder"라는 변수에 저장
encoder=OneHotEncoder()
```


```python
# 'encoder'를 사용해 Embarked 항목 값으로 학습
encoder.fit(df[['Embarked']])
```

<pre>
OneHotEncoder()
</pre>

```python
# "encoder"의 transform()를 사용해 'Embarked' 변수를 변환해 'onehot'이라는 변수에 저장
onehot=encoder.transform(df[["Embarked"]])
```


```python
# 'onehot'이라는 변수를 array 형태로 변환
onehot=onehot.toarray()
```


```python
onehot # S,C,Q 세가지 값을 1과 0인 형태로
```

<pre>
array([[0., 0., 1.],
       [1., 0., 0.],
       [0., 0., 1.],
       ...,
       [0., 0., 1.],
       [1., 0., 0.],
       [0., 1., 0.]])
</pre>

```python
# 'onehot'이라는 변수를 DataFrame 형태로 변환
onehot=pd.DataFrame(onehot)
```


```python
onehot
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>884</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>885</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>886</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>887</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>888</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>889 rows × 3 columns</p>
</div>



```python
# 참고) encoder의 'get_feature_names()'를 사용하면 column 이름을 자동생성할 수도 있음(변수 항목이 많은 경우에 유용)
encoder.get_feature_names()
```

<pre>
array(['x0_C', 'x0_Q', 'x0_S'], dtype=object)
</pre>

```python
# 컬럼 이름을 직접 생성
onehot.columns=['C','Q','S']
```


```python
# 인코딩 결과 확인
onehot
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>C</th>
      <th>Q</th>
      <th>S</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>884</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>885</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>886</th>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>887</th>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>888</th>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>889 rows × 3 columns</p>
</div>



```python
# 기존 df에 인코딩 결과를 병합
onehot=pd.concat([df,onehot],axis=1)
```


```python
onehot
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
      <th>Embarked</th>
      <th>C</th>
      <th>Q</th>
      <th>S</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>7.2500</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>71.2833</td>
      <td>C</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>3</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.9250</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>53.1000</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>8.0500</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>884</th>
      <td>0</td>
      <td>2</td>
      <td>male</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>13.0000</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>885</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>19.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>886</th>
      <td>0</td>
      <td>3</td>
      <td>female</td>
      <td>28.0</td>
      <td>1</td>
      <td>2</td>
      <td>23.4500</td>
      <td>S</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>887</th>
      <td>1</td>
      <td>1</td>
      <td>male</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>C</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>888</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>32.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.7500</td>
      <td>Q</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>889 rows × 11 columns</p>
</div>



```python
# 인코딩 전 'Embarked' 변수 제거 후 df에 업데이트(Embarked말고 새로 생성한 변수를 써야하는 거니까)
df=onehot.drop('Embarked', axis=1)
```


```python
df
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Survived</th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
      <th>C</th>
      <th>Q</th>
      <th>S</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>22.0</td>
      <td>1</td>
      <td>0</td>
      <td>7.2500</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>38.0</td>
      <td>1</td>
      <td>0</td>
      <td>71.2833</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>1</td>
      <td>3</td>
      <td>female</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.9250</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>35.0</td>
      <td>1</td>
      <td>0</td>
      <td>53.1000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>35.0</td>
      <td>0</td>
      <td>0</td>
      <td>8.0500</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>884</th>
      <td>0</td>
      <td>2</td>
      <td>male</td>
      <td>27.0</td>
      <td>0</td>
      <td>0</td>
      <td>13.0000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>885</th>
      <td>1</td>
      <td>1</td>
      <td>female</td>
      <td>19.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>886</th>
      <td>0</td>
      <td>3</td>
      <td>female</td>
      <td>28.0</td>
      <td>1</td>
      <td>2</td>
      <td>23.4500</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>1.0</td>
    </tr>
    <tr>
      <th>887</th>
      <td>1</td>
      <td>1</td>
      <td>male</td>
      <td>26.0</td>
      <td>0</td>
      <td>0</td>
      <td>30.0000</td>
      <td>1.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
    <tr>
      <th>888</th>
      <td>0</td>
      <td>3</td>
      <td>male</td>
      <td>32.0</td>
      <td>0</td>
      <td>0</td>
      <td>7.7500</td>
      <td>0.0</td>
      <td>1.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
<p>889 rows × 10 columns</p>
</div>



```python
#전처리: 진위형 변수로 변경 -> 성별은 문자보다 숫자로 다루는 게 나으니까
df["Sex"] = df.Sex.map({"female":0, "male":1})

#Input 변수와 Output 변수 구분(생존 변수만 y 변수)
X=np.array(df.iloc[:, 1:]) # 모든 행에 대하여 1번 열 데이터 전까지 가져오기
y=np.array(df['Survived'])

#트레이닝 셋트와 테스트 셋트로 데이터 구분(여기서는 7:3으로 구분)
from sklearn.model_selection import train_test_split

#random_state는 반복적으로 같은 결과를 내기 위해서 설정 무작위 설정
X_train, X_test, y_train, y_test=train_test_split(X, y, test_size=0.3, random_state=0)

#의사결정나무모델에 데이터 적합(fitting) 피팅은 학습시키는 것 학습시키는 모델이 의사결정나무모델
from sklearn.tree import DecisionTreeClassifier

tree=DecisionTreeClassifier(random_state=0, max_depth=3)
tree.fit(X_train, y_train)

#Training값을 X_test에서 넣음
temp_y_pred=tree.predict(X_test)

#정확도 계산
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix

temp_acc2=accuracy_score(y_test, temp_y_pred)
#y_test와 temp_y_pred로 예측한 값을 적용하여 temp_acc로 추출함.

print('정확도:', format(temp_acc2))
```

<pre>
정확도: 0.7902621722846442
</pre>

```python
# 각 변수에 대한 중요도 값들이 array로 반환됨
tree.feature_importances_
```

<pre>
array([0.20212022, 0.59958245, 0.0691925 , 0.06662978, 0.        ,
       0.06247505, 0.        , 0.        , 0.        ])
</pre>

```python
# 데이터 프레임으로 만들기
pd.DataFrame(tree.feature_importances_.reshape((1,-1)), index=['feature_importance'])
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>8</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>feature_importance</th>
      <td>0.20212</td>
      <td>0.599582</td>
      <td>0.069193</td>
      <td>0.06663</td>
      <td>0.0</td>
      <td>0.062475</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>



```python
df.columns # survived가 필요없을 것이다?그래서 빼준다
```

<pre>
Index(['Survived', 'Pclass', 'Sex', 'Age', 'SibSp', 'Parch', 'Fare', 'C', 'Q',
       'S'],
      dtype='object')
</pre>

```python
pd.DataFrame(tree.feature_importances_.reshape((1,-1)), columns=df.columns[1:], index=['feature_importance'])
```

<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Pclass</th>
      <th>Sex</th>
      <th>Age</th>
      <th>SibSp</th>
      <th>Parch</th>
      <th>Fare</th>
      <th>C</th>
      <th>Q</th>
      <th>S</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>feature_importance</th>
      <td>0.20212</td>
      <td>0.599582</td>
      <td>0.069193</td>
      <td>0.06663</td>
      <td>0.0</td>
      <td>0.062475</td>
      <td>0.0</td>
      <td>0.0</td>
      <td>0.0</td>
    </tr>
  </tbody>
</table>
</div>


### -> 여전히 변수중요도 중에 성별이 중요한 것을 볼 수 있다



```python
print('정확도(탑승항구 미포함):', format(temp_acc1))
print('정확도(탑승항구 포함):', format(temp_acc2))
```

<pre>
정확도(탑승항구 미포함): 0.8208955223880597
정확도(탑승항구 포함): 0.7902621722846442
</pre>
### -> 정확도를 보니  탑승항구를 포함한 경우 정확도가 더 낮아진다.

### -> 변수정확도를 봐도 탑승항구의 C,Q,S 정보는 모두 값이 0으로 유의미한 정보가 아니다



```python
```
