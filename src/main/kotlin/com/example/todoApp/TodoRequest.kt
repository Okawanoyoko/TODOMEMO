package com.example.todoApp

import jdk.internal.vm.StackChunk.init
import org.springframework.data.jpa.domain.AbstractPersistable_.id

data class TodoRequest(
    val id: Long?,
    val filename: String,
    val title: String,
    val content: String,
    val bburl: String
)

data class TodoRequestWithId(
    val id: Long,
    val title: String,
    val content: String
)

// DELETE 用
data class DeleteRequest(
    val id: Long
)