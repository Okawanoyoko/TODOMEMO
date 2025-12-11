package com.example.todoApp


import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.net.URL
import java.time.LocalDateTime

//テーブルを作る
@Entity
@Table(name = "todo") //テーブル名を明示。描かなかったら１５行目から勝手にとってきてtodo_entityになるらしい
class TodoEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //主キーを定義。自動生成されるという指示　IDが主キー　
    var id: Long? = null, //はてなはNULLABLEといういみ

//    @Column(nullable = false)
//    val uid: String = "",

    @Column(nullable = false)
    var filename: String = "",

    @Column(nullable = false)
    var title: String = "",

    @Column(columnDefinition = "TEXT", nullable = false)
    var content: String = "",

    @Column(nullable = true)
    var bburl: String? = null,

    var time: LocalDateTime = LocalDateTime.now(),

//    var imgURL: URL? = null
)