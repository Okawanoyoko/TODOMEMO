package com.example.todoApp

import org.hamcrest.CoreMatchers.equalTo
import org.hamcrest.MatcherAssert.assertThat
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.restclient.RestTemplateBuilder
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.http.HttpStatus




@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class TodoAppApplicationTests(
    @Autowired val restTemplateBuilder: RestTemplateBuilder,
    @LocalServerPort val port: Int,
    @Autowired val repository: TodoRepository
//    val todos: Any
) {
    val restTemplate = restTemplateBuilder.build()

    @BeforeEach
    fun setup() {
        // 各テストは項目が空の状態で始める。
        repository.deleteAll()
    }

    @Test
    fun `GETリクエストはOKステータスを返す`() {
        // localhost/todos に GETリクエストを発行する。
        val response = restTemplate.getForEntity("http://localhost:$port/todos", String::class.java)
        // レスポンスのステータスコードは OK である。
        assertThat(response.statusCode, equalTo(HttpStatus.OK))
    }

    @Test
    fun `POSTリクエストはOKステータスを返す`() {
        // localhost/todos に POSTリクエストを送る。このときのボディは {"text": "hello"}
        val request = TodoRequest("hello")
        val response = restTemplate.postForEntity("http://localhost:$port/todos", request, String::class.java)
        // レスポンスのステータスコードは OK であること。
        assertThat(response.statusCode, equalTo(HttpStatus.OK))
    }

    @Test
    fun `GETリクエストは空のTodoリストを返す`() {
        // localhost/todos に GETリクエストを送り、レスポンスを TodoEntity の配列として解釈する。
        val response = restTemplate.getForEntity("http://localhost:$port/todos", Array<TodoEntity>::class.java)
        val todos = response.body!!
        // 配列は0個の要素をもつこと。
        assertThat(todos.size, equalTo(0))
    }

    @Test
    fun `POSTリクエストはTodoオブジェクトを格納する`() {
        // 1. POSTリクエストを送る
        val request = TodoRequest("hello")
        restTemplate.postForEntity("http://localhost:$port/todos", request, String::class.java)

        // 2. GETリクエストを送る
        val response = restTemplate.getForEntity("http://localhost:$port/todos", Array<TodoEntity>::class.java)
        val todos = response.body!!

        // 3. 検証
        assertThat(todos.size, equalTo(1))
        assertThat(todos[0].text, equalTo("hello"))
    }}